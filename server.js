import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";
import { getDbConfig, formatDbError } from "./config/database.js";

const port = process.env.PORT;
let server;
let shutdownInProgress = false;

// Process startup information
process.on("start", () => {
  console.log("Process started with PID:", process.pid);
  console.log("Node version:", process.version);
  console.log("Environment:", process.env.NODE_ENV);
});

// Connect to MongoDB
async function connectDB() {
  try {
    const dbConfig = getDbConfig();
    await mongoose.connect(dbConfig.url, dbConfig.options);
    console.log("Connected to the database");

    // Log connection details in development
    if (process.env.NODE_ENV === "development") {
      console.log("Connected to database URL:", dbConfig.url.split("@")[1]); // Safe logging without credentials
    }

    return true;
  } catch (error) {
    const formattedError = formatDbError(error);
    console.error("Database connection error:", formattedError);
    return false;
  }
}

// Start server
async function startServer() {
  const isConnected = await connectDB();
  if (!isConnected) {
    process.exit(1);
  }

  server = app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
  });
}

// Graceful shutdown
async function shutdown(signal) {
  if (shutdownInProgress) {
    console.log("Shutdown already in progress...");
    return;
  }

  shutdownInProgress = true;
  console.log(
    `\nReceived ${signal || "shutdown signal"}. Starting graceful shutdown...`
  );

  // Set a timeout for forceful exit
  const forceExit = setTimeout(() => {
    console.error("Forceful shutdown executed after timeout");
    process.exit(1);
  }, 10000); // 10 seconds timeout

  try {
    // Close server first to stop accepting new connections
    if (server) {
      await new Promise((resolve) => {
        server.close((err) => {
          if (err) {
            console.error("Error closing server:", err);
          } else {
            console.log("Server closed successfully");
          }
          resolve();
        });
      });
    }

    // Close database connection
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log("Database connection closed successfully");
    }

    clearTimeout(forceExit);
    console.log("Graceful shutdown completed");
    process.exit(0);
  } catch (error) {
    console.error("Error during shutdown:", error);
    clearTimeout(forceExit);
    process.exit(1);
  }
}

// Process event handlers
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGQUIT", () => shutdown("SIGQUIT"));

// Uncaught error handlers
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  shutdown("uncaught exception");
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  shutdown("unhandled rejection");
});

// Memory usage monitoring
setInterval(() => {
  const used = process.memoryUsage();
  const memoryUsage = {
    rss: `${Math.round(used.rss / 1024 / 1024)}MB`,
    heapTotal: `${Math.round(used.heapTotal / 1024 / 1024)}MB`,
    heapUsed: `${Math.round(used.heapUsed / 1024 / 1024)}MB`,
  };
  console.log("Memory usage:", memoryUsage);
}, 300000); // Log every 5 minutes

// Start the application
startServer();

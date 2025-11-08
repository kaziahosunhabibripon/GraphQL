import "dotenv/config";

const dbConfig = {
  url: process.env.DB_URL,
  options: {
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000,

    maxPoolSize: 10,
    minPoolSize: 1,
  },
};

export const getDbConfig = () => {
  if (!dbConfig.url) {
    throw new Error(
      "Database URL is not configured. Please check your .env file."
    );
  }

  return {
    ...dbConfig,

    options: {
      ...dbConfig.options,
    },
  };
};

// Helper function to format connection errors
export const formatDbError = (error) => {
  return {
    message: "Database connection error",
    details: error.message,
    code: error.code,
    timestamp: new Date().toISOString(),
  };
};

export default dbConfig;

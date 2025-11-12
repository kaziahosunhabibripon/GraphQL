import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/index.js";
const app = express();

// Middleware
app.use([
  cors(),
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
  express.json(),
]);

// GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
app.get("/", (req, res) => {
  res.send("Welcome to the GraphQL Book Management API");
});
app.get("/health", (req, res) => {
  res.send("Server is healthy");
});

export default app;

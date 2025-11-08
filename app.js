import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema.js";

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

export default app;

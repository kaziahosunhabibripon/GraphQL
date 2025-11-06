import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema.js";
const app = express();
const port = 5000;

app.use(
  "/graphql",
  graphqlHTTP({
    schema,

    graphiql: true,
  })
);
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

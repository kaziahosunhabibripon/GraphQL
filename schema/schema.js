// schema/schema.js
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from "graphql";

// Define a simple Query type
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    hello: {
      type: GraphQLString,
      resolve() {
        return "Hello from GraphQL!";
      },
    },
    randomNumber: {
      type: GraphQLInt,
      resolve() {
        return Math.floor(Math.random() * 100);
      },
    },
  },
});

// Create the schema
const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;

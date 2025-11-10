import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";
import AuthorType from "./AuthorType.js";
import Author from "../models/Author.js";

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    authorId: { type: GraphQLID },
    author: {
      type: AuthorType,
      resolve(parent) {
        return Author.findById(parent.authorId);
      },
    },
  }),
});
export default BookType;

import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from "graphql";
import BookType from "./BookType.js";
import Book from "../models/Book.js";

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent) {
        return Book.find({ authorId: parent.id });
      },
    },
  }),
});
export default AuthorType;

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
} from "graphql";

import Author from "../models/Author.js";
import Book from "../models/Book.js";
import AuthorType from "../types/AuthorType.js";
import BookType from "../types/BookType.js";
import BookPaginationType from "../types/BookPaginationType.js";
import AuthorPaginationType from "../types/AuthorPaginationType.js";
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const author = new Author({ name: args.name });
        return await author.save();
      },
    },

    addBook: {
      type: BookType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const book = new Book({
          title: args.title,
          authorId: args.authorId,
        });
        return await book.save();
      },
    },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    authors: {
      type: AuthorPaginationType,
      args: {
        page: { type: GraphQLInt },
        authorId: { type: GraphQLID },
      },
      async resolve(parent, args) {
        const limit = 1;
        const page = args.page || 1;
        const offset = (page - 1) * limit;
        const totalCount = await Author.countDocuments();
        const totalPages = Math.ceil(totalCount / limit);

        const authors = await Author.find().skip(offset).limit(limit);
        const NextPage = page < totalPages ? "true" : "false";
        const PreviousPage = page > 1 ? "true" : "false";
        return {
          authors,
          totalPages,
          currentPage: page,
          isNextPage: NextPage,
          isPreviousPage: PreviousPage,
        };
      },
    },
    books: {
      type: BookPaginationType,

      args: {
        page: { type: GraphQLInt },
        authorId: { type: GraphQLID },
      },
      async resolve(parent, args) {
        const limit = 3;
        const page = args.page || 1;
        const offset = (page - 1) * limit;
        const filter = {};
        if (args.authorId) filter.authorId = args.authorId;

        const totalCount = await Book.countDocuments(filter);
        const totalPages = Math.ceil(totalCount / limit);

        const books = await Book.find(filter).skip(offset).limit(limit);
        const NextPage = page < totalPages ? "true" : "false";
        const PreviousPage = page > 1 ? "true" : "false";
        return {
          books,
          totalPages,
          currentPage: page,
          isNextPage: NextPage,
          isPreviousPage: PreviousPage,
        };
      },
    },
  },
});
export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

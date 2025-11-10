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
      type: new GraphQLList(AuthorType),
      resolve() {
        return Author.find();
      },
    },
    books: {
      type: BookPaginationType,

      args: {
        page: { type: GraphQLInt },
        authorId: { type: GraphQLID },
      },
      async resolve(parent, args) {
        const limit = 2;
        const page = args.page || 1;
        const offset = (page - 1) * limit;
        const filter = {};
        if (args.authorId) filter.authorId = args.authorId;

        const totalCount = await Book.countDocuments(filter);
        const totalPages = Math.ceil(totalCount / limit);

        const books = await Book.find(filter).skip(offset).limit(limit);
        return {
          books,
          totalPages,
          currentPage: page,
          isNextPage: page < totalPages ? "true" : "false",
          isPreviousPage: page > 1 ? "true" : "false",
        };
      },
    },
  },
});
export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

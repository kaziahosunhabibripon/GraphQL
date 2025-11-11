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
import CategoryType from "../types/CategoryTypes.js";
import Category from "../models/Category.js";
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
        categoryId: { type: new GraphQLList(GraphQLID) },
      },
      async resolve(parent, args) {
        const book = new Book({
          title: args.title,
          authorId: args.authorId,
          categoryId: args.categoryId,
        });
        return await book.save();
      },
    },
    addCategory: {
      type: CategoryType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        parentCategory: { type: GraphQLID },
      },
      resolve(parent, args) {
        const category = new Category({
          name: args.name,
          parentCategory: args.parentCategory || null,
        });
        return category.save();
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
    category: {
      type: CategoryType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Category.findById(args.id);
      },
    },

    categories: {
      type: new GraphQLList(CategoryType),
      resolve(parent, args) {
        return Category.find();
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

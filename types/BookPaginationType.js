import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} from "graphql";

import BookType from "./BookType.js";

const BookTypePaginationType = new GraphQLObjectType({
  name: "BookTypePaginationType",
  fields: () => {
    return {
      books: { type: new GraphQLList(BookType) },
      totalPages: { type: GraphQLInt },
      currentPage: { type: GraphQLInt },
      isNextPage: { type: GraphQLString },
      isPreviousPage: { type: GraphQLString },
    };
  },
});
export default BookTypePaginationType;

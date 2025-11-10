import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} from "graphql";
import AuthorType from "./AuthorType.js";

const AuthorPaginationType = new GraphQLObjectType({
  name: "AuthorPaginationType",
  fields: () => {
    return {
      authors: { type: new GraphQLList(AuthorType) },
      totalPages: { type: GraphQLInt },
      currentPage: { type: GraphQLInt },
      isNextPage: { type: GraphQLString },
      isPreviousPage: { type: GraphQLString },
    };
  },
});
export default AuthorPaginationType;

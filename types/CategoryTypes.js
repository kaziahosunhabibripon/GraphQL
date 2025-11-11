import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import BookType from "./BookType.js";
import Book from "../models/Book.js";

const CategoryType = new GraphQLObjectType({
  name: "Category",
  fields: () => {
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      books: {
        type: new GraphQLList(BookType),
        async resolve(parent, args) {
          return await Book.find({ categoryId: { $in: parent.id } });
        },
      },
    };
  },
});
export default CategoryType;

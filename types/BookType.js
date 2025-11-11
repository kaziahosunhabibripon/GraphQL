import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from "graphql";
import AuthorType from "./AuthorType.js";
import Author from "../models/Author.js";
import CategoryType from "./CategoryTypes.js";
import Category from "../models/Category.js";
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
    categories: {
      type: new GraphQLList(CategoryType),
      async resolve(parent, args) {
        return await Category.find({ _id: { $in: parent.categoryId } });
      },
    },
  }),
});
export default BookType;

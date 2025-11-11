import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import Category from "../models/Category.js";

const CategoryType = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    parentCategory: {
      type: CategoryType,
      resolve(parent) {
        return parent.parentCategory
          ? Category.findById(parent.parentCategory)
          : null;
      },
    },

    subCategories: {
      type: new GraphQLList(CategoryType),
      resolve(parent) {
        return Category.find({ parentCategory: parent.id });
      },
    },
  }),
});
export default CategoryType;

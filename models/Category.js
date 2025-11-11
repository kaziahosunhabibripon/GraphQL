import { model, Schema } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true },
  parentCategory: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },
});

const Category = model("Category", CategorySchema);

export default Category;

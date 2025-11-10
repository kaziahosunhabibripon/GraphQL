import { model, Schema } from "mongoose";

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "Author",
  },
});
const Book = model("Book", BookSchema);

export default Book;

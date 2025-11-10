import { model, Schema } from "mongoose";

const AuthorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});
const Author = model("Author", AuthorSchema);

export default Author;

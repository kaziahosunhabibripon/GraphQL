import { Schema, model } from "mongoose";

const PostSchema = new Schema({
  title: String,
  content: String,
});

export default model("Post", PostSchema);

import { Schema, model } from "mongoose";

const VideoSchema = new Schema({
  title: String,
  url: String,
});

export default model("Video", VideoSchema);

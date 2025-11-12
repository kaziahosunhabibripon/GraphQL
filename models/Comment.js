import { model, Schema } from "mongoose";

const CommentSchema = new Schema({
  content: String,
  commentableId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  commentableType: {
    type: String,
    required: true,
    enum: ["Post", "Video"],
  },
});

export default model("Comment", CommentSchema);

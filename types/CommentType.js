import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLUnionType,
} from "graphql";
import PostType from "./PostType.js";
import VideoType from "./VideoType.js";
import Post from "../models/Post.js";
import Video from "../models/Video.js";

const CommentableType = new GraphQLUnionType({
  name: "CommentableData",
  types: [PostType, VideoType],
  resolveType(value) {
    if (value.url) {
      return "Video";
    }
    if (value.content) {
      return "Post";
    }
    return null;
  },
});
const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    id: { type: GraphQLID },
    content: { type: GraphQLString },
    commentableId: { type: GraphQLID },
    commentableType: { type: GraphQLString },
    commentableData: {
      type: CommentableType,
      resolve: async (parent) => {
        if (parent.commentableType === "Post") {
          return await Post.findById(parent.commentableId);
        }
        if (parent.commentableType === "Video") {
          return await Video.findById(parent.commentableId);
        }
        return null;
      },
    },
  }),
});
export default CommentType;

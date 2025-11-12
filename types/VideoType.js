import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

const VideoType = new GraphQLObjectType({
  name: "Video",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    url: { type: GraphQLString },
  }),
});

export default VideoType;

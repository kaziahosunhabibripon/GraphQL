import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";

const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  }),
});

export default PostType;

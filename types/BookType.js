import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    authorId: { type: GraphQLID },
  }),
});
export default BookType;

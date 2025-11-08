import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} from "graphql";
import User from "../models/user.js";
const users = [];
// Define User type custom GraphQL object type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
    occupation: { type: GraphQLString },
    isActive: { type: GraphQLBoolean },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});

// Define Query type
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return users;
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
  },
});
// Define Mutation type create update delete
const userMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt },
        occupation: { type: GraphQLString },
        isActive: { type: GraphQLBoolean },
      },
      async resolve(parent, args) {
        try {
          const user = new User(args);
          return await user.save();
        } catch (error) {
          throw new Error(error.message);
        }
      },
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt },
        occupation: { type: GraphQLString },
        isActive: { type: GraphQLBoolean },
      },
      async resolve(parent, args) {
        try {
          const { id, ...updateData } = args;
          const user = await User.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
          );
          if (!user) throw new Error("User not found");
          return user;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        try {
          const user = await User.findByIdAndDelete(args.id);
          if (!user) throw new Error("User not found");
          return user;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    },
  },
});
export default new GraphQLSchema({
  query: RootQuery,
  mutation: userMutation,
});

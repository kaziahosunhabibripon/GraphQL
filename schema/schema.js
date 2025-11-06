import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
} from "graphql";

// Dummy data
const users = [
  {
    id: "1",
    name: "Azmain Habib",
    email: "azmain@gmail.com",
    age: 25,
    occupation: "Software Engineer",
    isActive: true,
  },
  {
    id: "2",
    name: "Ahosun Habib",
    email: "ahosun@gmail.com",
    age: 30,
    occupation: "Teacher",
    isActive: false,
  },
  {
    id: "3",
    name: "Jinnat Jahan",
    email: "jinnat@gmail.com",
    age: 28,
    occupation: "Housewife",
    isActive: false,
  },
];

// Define User type custom GraphQL object type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
    occupation: { type: GraphQLString },
    isActive: { type: GraphQLBoolean },
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
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return users.find((user) => user.id === args.id);
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
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt },
        occupation: { type: GraphQLString },
        isActive: { type: GraphQLBoolean },
      },
      resolve(parent, args) {
        const newUser = {
          id: String(users.length + 1),
          name: args.name,
          email: args.email,
          age: args.age,
          occupation: args.occupation,
          isActive: args.isActive,
        };
        users.push(newUser);

        return newUser;
      },
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt },
        occupation: { type: GraphQLString },
        isActive: { type: GraphQLBoolean },
      },
      resolve(parent, args) {
        const user = users.find((user) => user.id === args.id);

        if (!user) throw new Error("User not found");
        if (user) {
          Object.keys(args).forEach((key) => {
            if (args[key] !== undefined) user[key] = args[key];
          });
          return user;
        }

        Object.assign(user, args);
        return user;
      },
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parent, args) {
        const userIndex = users.findIndex((user) => user.id === args.id);
        if (userIndex === -1) throw new Error("User not found");

        const deletedUser = users.splice(userIndex, 1);
        return deletedUser[0];
      },
    },
  },
});
export default new GraphQLSchema({
  query: RootQuery,
  mutation: userMutation,
});

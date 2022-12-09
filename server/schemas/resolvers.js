const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // GET a single user by ID
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v-password');
        return userData;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  Mutation: {
    // CREATE a new user
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      if (!user) {
        throw new AuthenticationError(`Something is wrong!`);
      }
      return { token, user };
    },
    // user login
    login: async (parent, { username, email }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError(`Can't find this user`);
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError(`Wrong password!`);
      }

      const token = signToken(user);
      return { token, user };
    },
    // save book to a user's savedbooks field
    saveBook: async (parent, { newBook }, context) => {
      if (context.user) {
        const updateUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks:  newBook  } },
          { new: true, runValidators: true }
        );
        return updateUser;
      }
    },

    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId} } },
          { new: true }
        );
      }
      throw new AuthenticationError(`Couldn't find user with this id!`);
    },
  },
};

module.exports = resolvers;

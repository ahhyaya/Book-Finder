const { AuthenticationError } = require("apollo-server-express");
const { Book, User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // GET a single user by ID
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  Mutation: {
    // CREATE a new user
    addUser: async (parent, { username, email, password }) => {
      const user = await User.createUser({ username, email, password });
      if (!user) {
        throw new AuthenticationError(`Something is wrong!`);
      }
      const token = signToken(user);
      return { token, user };
    },
    // user login
    login: async (parent, { username, email }) => {
      const user = await User.findOne({ username, email });

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
    saveBook: async (parent, {  bookId, authors, description, title, image, link }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: { bookId, authors, description, title, image, link } } },
          { new: true, runValidators: true }
        );
      }
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: bookId } },
          { new: true }
        );
      }
      throw new AuthenticationError(`Couldn't find user with this id!`);
    },
  },
};

module.exports = resolvers;

const { gql } = require('apollo-server-express');

const typeDefs = gql `
    type Book {
        bookId: String
        authors: [String]
        description: String
        image: String
        link: String
        title: String
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Query {
        me: User
    }

    type inputBook {
        bookId: String
        authors: [String]
        title: String
        description: String
        image: String
        link: String
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!):Auth
        saveBook(newBook: inputBook): User
        removeBook(bookId: String!): User
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;
const { gql } = require('apollo-server-express');

const typeDefs = gql `
    type Book {
        bookId: ID!
        authors: [String]
        description: String
        image: String
        link: String
        title: String!
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

    type InputBook {
        bookId: String!
        authors: [String]
        title: String!
        description: String!
        image: String
        link: String
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!):Auth
        saveBook(newBook: InputBook!): User
        removeBook(bookId: ID!): User
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;
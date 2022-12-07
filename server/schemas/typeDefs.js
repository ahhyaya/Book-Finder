const { gql } = require('apollo-server-express');

const typeDefs = gql `
    type Book {
        _id: ID!
        authors: String!
        description: String!
        bookId: ID!
        image: String! 
        link: String!
        title: String!
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        savedBooks: [String]!
    }

    type Query {
        user(userId: ID!): User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(username: String!, password: String!):Auth
        saveBook(userId:ID!, book: String!): User
        deleteBook(book: String!): User
    }
`;

module.exports = typeDefs;
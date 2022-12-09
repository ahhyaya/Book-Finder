import { gql } from '@apollo/client';
// import { Mutation } from '../server/schemas/resolvers';

export const ADD_USER = gql `
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            email
        }
    }
}
`;

export const SAVE_BOOK = gql `
mutation saveBook($userId: String!, $book: String!) {
    saveBook(userId: $userId, book: $book) {
        _id
        username
        books
    }
}
`;

export const LOGIN_USER = gql `
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user{
                _id
                username
                email
            }
        }
    }
`;

export const REMOVE_BOOK =gql `
    mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
            bookId
            books
        }
    }
`;


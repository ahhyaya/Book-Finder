import { gql } from '@apollo/client';

export const QUERY_USER = gql `
query user {
    user {
        _id
        username
        email
        bookCount
        savedBooks
    }
}
`;

export const QUERY_SINGLE_USER = gql `
    query singleUser($userId: ID!) {
        _id
        username
        email
        bookCount
        savedBooks
    }
`;

export const QUERY_GET_ME = gql `
    query me {
        me {
         _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
        }
    }
`
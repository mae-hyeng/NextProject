import { gql } from "@apollo/client";

export const FETCH_BOARD = gql`
    query fetchBoard($boardId: ID!) {
        fetchBoard(boardId: $boardId) {
            _id
            writer
            title
            contents
            youtubeUrl
            # likeCount
            # dislikeCount
            images
            boardAddress {
                _id
                zipcode
                address
                addressDetail
                createdAt
                updatedAt
                deletedAt
            }
            # user {
            #     _id
            #     email
            #     name
            #     picture
            #     userPoint {
            #         _id
            #         amount
            #         user
            #         createdAt
            #         updatedAt
            #         deletedAt
            #     }
            #     createdAt
            #     updatedAt
            #     deletedAt
            # }
            createdAt
            updatedAt
            deletedAt
        }
    }
`;

export const FETCH_USER = gql`
    query ($email: String!) {
        fetchUser(email: $email) {
            _id
            name
            email
            userPoint {
                _id
                # amount
            }
        }
    }
`;

import { gql } from "@apollo/client";

export const FETCH_BOARDS = gql`
    query fetchBoards($page: Int, $search: String, $endDate: DateTime, $startDate: DateTime) {
        fetchBoards(page: $page, search: $search, endDate: $endDate, startDate: $startDate) {
            _id
            writer
            title
            contents
            youtubeUrl
            likeCount
            dislikeCount
            # images
            boardAddress {
                _id
                zipcode
                address
                addressDetail
                createdAt
                updatedAt
                deletedAt
            }
            # user
            createdAt
            updatedAt
            deletedAt
            __typename
        }
    }
`;

export const DELETE_BOARD = gql`
    mutation deleteBoard($boardId: ID!) {
        deleteBoard(boardId: $boardId)
    }
`;

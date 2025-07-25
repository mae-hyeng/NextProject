import { gql } from "@apollo/client";

export const CREATE_BOARD = gql`
    mutation createBoard(
        $writer: String
        $password: String
        $title: String!
        $contents: String!
        $youtubeUrl: String
        $boardAddress: BoardAddressInput
        $images: [String!]
    ) {
        createBoard(
            createBoardInput: {
                writer: $writer
                password: $password
                title: $title
                contents: $contents
                youtubeUrl: $youtubeUrl
                boardAddress: $boardAddress
                images: $images
            }
        ) {
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
            # user
            # createdAt
            # updatedAt
            # deletedAt
        }
    }
`;

export const UPDATE_BOARD = gql`
    mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String, $boardId: ID!) {
        updateBoard(updateBoardInput: $updateBoardInput, password: $password, boardId: $boardId) {
            _id
            writer
            title
            contents
            youtubeUrl
        }
    }
`;

export const UPLOAD_FILE = gql`
    mutation uploadFile($file: Upload!) {
        uploadFile(file: $file) {
            url
        }
    }
`;

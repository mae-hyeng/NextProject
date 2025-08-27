import { gql } from "@apollo/client";

export const TOGGLE_TRAVEL_PRODUCT_PICK = gql`
    mutation toggleTravelproductPick($travelproductId: ID!) {
        toggleTravelproductPick(travelproductId: $travelproductId)
    }
`;

export const CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING = gql`
    mutation createPointTransactionOfBuyingAndSelling($useritemId: ID!) {
        createPointTransactionOfBuyingAndSelling(useritemId: $useritemId) {
            # buyer {
            # _id
            # email
            # name
            # }
            seller {
                _id
                email
                name
            }
            soldAt
        }
    }
`;

export const DELETE_TRAVEL_PRODUCT = gql`
    mutation deleteTravelproduct($travelproductId: ID!) {
        deleteTravelproduct(travelproductId: $travelproductId)
    }
`;

export const CREATE_TRAVEL_PRODUCT_QUESTION = gql`
    mutation createTravelproductQuestion(
        $createTravelproductQuestionInput: CreateTravelproductQuestionInput!
        $travelproductId: ID!
    ) {
        createTravelproductQuestion(
            createTravelproductQuestionInput: $createTravelproductQuestionInput
            travelproductId: $travelproductId
        ) {
            _id
            contents
            # travelproduct {
            #     _id
            #     name
            #     remarks
            #     contents
            #     price
            #     tags
            # }
            user {
                _id
                email
                name
            }
            createdAt
            updatedAt
            deletedAt
            __typename
        }
    }
`;

export const UPDATE_TRAVEL_PRODUCT_QUESTION = gql`
    mutation updateTravelproductQuestion(
        $updateTravelproductQuestionInput: UpdateTravelproductQuestionInput!
        $travelproductQuestionId: ID!
    ) {
        updateTravelproductQuestion(
            updateTravelproductQuestionInput: $updateTravelproductQuestionInput
            travelproductQuestionId: $travelproductQuestionId
        ) {
            _id
            contents
            # travelproduct {
            #     _id
            #     # name
            #     remarks
            #     contents
            #     price
            #     tags
            # }
            user {
                _id
                email
                name
            }
            createdAt
            updatedAt
            deletedAt
            __typename
        }
    }
`;

export const DELETE_TRAVEL_PRODUCT_QUESTION = gql`
    mutation ($travelproductQuestionId: ID!) {
        deleteTravelproductQuestion(travelproductQuestionId: $travelproductQuestionId)
    }
`;

export const CREATE_TRAVEL_PRODUCT_QUESTION_ANSWER = gql`
    mutation createTravelproductQuestionAnswer(
        $createTravelproductQuestionAnswerInput: CreateTravelproductQuestionAnswerInput!
        $travelproductQuestionId: ID!
    ) {
        createTravelproductQuestionAnswer(
            createTravelproductQuestionAnswerInput: $createTravelproductQuestionAnswerInput
            travelproductQuestionId: $travelproductQuestionId
        ) {
            _id
            contents
            # travelproductQuestion {
            #     _id
            #     contents
            # }
            user {
                _id
                name
                email
            }
            createdAt
            updatedAt
            deletedAt
        }
    }
`;

export const UPDATE_TRAVEL_PRODUCT_QUESTION_ANSWER = gql`
    mutation updateTravelproductQuestionAnswer(
        $updateTravelproductQuestionAnswerInput: UpdateTravelproductQuestionAnswerInput!
        $travelproductQuestionAnswerId: ID!
    ) {
        updateTravelproductQuestionAnswer(
            updateTravelproductQuestionAnswerInput: $updateTravelproductQuestionAnswerInput
            travelproductQuestionAnswerId: $travelproductQuestionAnswerId
        ) {
            _id
            contents
            # travelproductQuestion {
            #     _id
            #     contents
            # }
            user {
                _id
                name
                email
            }
            createdAt
            updatedAt
            deletedAt
        }
    }
`;

export const DELETE_TRAVEL_PRODUCT_QUESTION_ANSWER = gql`
    mutation ($travelproductQuestionAnswerId: ID!) {
        deleteTravelproductQuestionAnswer(
            travelproductQuestionAnswerId: $travelproductQuestionAnswerId
        )
    }
`;

export const CREATE_TRAVEL_PRODUCT = gql`
    mutation createTravelProduct(
        $name: String!
        $remarks: String!
        $contents: String!
        $price: Int!
        $tags: [String!]
        $travelproductAddress: TravelproductAddressInput
        $images: [String!]
    ) {
        createTravelproduct(
            createTravelproductInput: {
                name: $name
                remarks: $remarks
                contents: $contents
                price: $price
                tags: $tags
                travelproductAddress: $travelproductAddress
                images: $images
            }
        ) {
            _id
            name
            remarks
            contents
            price
            tags
            images
            pickedCount
            # travelproductAddress
            # buyer
            # seller
            soldAt
            createdAt
            updatedAt
            deletedAt
            __typename
        }
    }
`;

export const UPDATE_TRAVEL_PRODUCT = gql`
    mutation updateTravelproduct(
        $updateTravelproductInput: UpdateTravelproductInput!
        $travelproductId: ID!
    ) {
        updateTravelproduct(
            updateTravelproductInput: $updateTravelproductInput
            travelproductId: $travelproductId
        ) {
            _id
            name
            remarks
            contents
            price
            tags
            images
            pickedCount
            travelproductAddress {
                _id
                zipcode
                address
                addressDetail
                lat
                lng
                createdAt
                updatedAt
                deletedAt
            }
            buyer {
                _id
                email
                name
                picture
                # userPoint
                createdAt
                updatedAt
                deletedAt
            }
            seller {
                _id
                email
                name
                picture
                # userPoint
                createdAt
                updatedAt
                deletedAt
            }
            soldAt
            createdAt
            updatedAt
            deletedAt
        }
    }
`;

export const DELETE_BOARD_COMMENT = gql`
    mutation deleteBoardComment($password: String, $boardCommentId: ID!) {
        deleteBoardComment(password: $password, boardCommentId: $boardCommentId)
    }
`;

export const CREATE_BOARD_COMMENT = gql`
    mutation createBoardComment($createBoardCommentInput: CreateBoardCommentInput!, $boardId: ID!) {
        createBoardComment(createBoardCommentInput: $createBoardCommentInput, boardId: $boardId) {
            _id
            writer
            contents
            rating
            # user {}
            createdAt
            updatedAt
            deletedAt
            __typename
        }
    }
`;

export const UPDATE_BOARD_COMMENT = gql`
    mutation updateBoardComment(
        $updateBoardCommentInput: UpdateBoardCommentInput!
        $password: String
        $boardCommentId: ID!
    ) {
        updateBoardComment(
            updateBoardCommentInput: $updateBoardCommentInput
            password: $password
            boardCommentId: $boardCommentId
        ) {
            _id
            writer
            contents
            rating
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
            createdAt
            updatedAt
            deletedAt
            __typename
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
            likeCount
            images
            __typename
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

export const LOGIN_USER = gql`
    mutation loginUser($password: String!, $email: String!) {
        loginUser(password: $password, email: $email) {
            accessToken
            __typename
        }
    }
`;

export const CREATE_POINT_TRANSACTION_OF_LOADING = gql`
    mutation createPointTransactionOfLoading($paymentId: ID!) {
        createPointTransactionOfLoading(paymentId: $paymentId) {
            _id
            impUid
            amount
            balance
            status
            statusDetail
            travelproduct {
                _id
                name
            }
            user {
                _id
                # name
                userPoint {
                    _id
                    amount
                }
            }
        }
    }
`;

export const CREATE_USER = gql`
    mutation createUser($email: String!, $password: String!, $name: String!) {
        createUser(createUserInput: { email: $email, password: $password, name: $name }) {
            _id
            email
            name
            picture
            # userPoint {
            #   _id
            #   amount
            #   user
            #   createdAt
            #   updatedAt
            #   deletedAt
            # }
            createdAt
            updatedAt
            deletedAt
            __typename
        }
    }
`;

export const LIKE_BOARD = gql`
    mutation likeBoard($boardId: ID!) {
        likeBoard(boardId: $boardId)
    }
`;

export const DISLIKE_BOARD = gql`
    mutation dislikeBoard($boardId: ID!) {
        dislikeBoard(boardId: $boardId)
    }
`;

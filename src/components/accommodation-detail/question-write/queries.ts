import { gql } from "@apollo/client";

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

export const FETCH_TRAVEL_PRODUCT_QUESTIONS = gql`
    query fetchTravelproductQuestions($page: Int, $travelproductId: ID!) {
        fetchTravelproductQuestions(page: $page, travelproductId: $travelproductId) {
            _id
            contents
            #     travelproduct {}
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

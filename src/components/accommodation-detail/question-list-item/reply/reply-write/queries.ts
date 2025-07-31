import { gql } from "@apollo/client";

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

export const FETCH_TRAVEL_PRODUCT_QUESTIONS_ANSWER = gql`
    query fetchTravelproductQuestionAnswers($page: Int, $travelproductQuestionId: ID!) {
        fetchTravelproductQuestionAnswers(
            page: $page
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

import { gql } from "@apollo/client";

export const FETCH_TRAVEL_PRODUCT = gql`
    query fetchTravelproduct($travelproductId: ID!) {
        fetchTravelproduct(travelproductId: $travelproductId) {
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
            __typename
        }
    }
`;

export const TOGGLE_TRAVEL_PRODUCT_PICK = gql`
    mutation toggleTravelproductPick($travelproductId: ID!) {
        toggleTravelproductPick(travelproductId: $travelproductId)
    }
`;

export const CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING = gql`
    mutation createPointTransactionOfBuyingAndSelling($useritemId: ID!) {
        createPointTransactionOfBuyingAndSelling(useritemId: $useritemId) {
            buyer {
                _id
                email
                name
            }
            seller {
                _id
                email
                name
            }
            soldAt
        }
    }
`;

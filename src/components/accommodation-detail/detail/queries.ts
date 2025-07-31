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

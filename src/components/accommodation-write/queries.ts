import { gql } from "@apollo/client";

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

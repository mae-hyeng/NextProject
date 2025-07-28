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
                # tags: $tag,
                # travelproductAddress: $travelproductAddress
                # images: $images
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

import { gql } from "@apollo/client";

export const FETCH_TRAVEL_PRODUCTS = gql`
    query fetchTravelproducts($isSoldout: Boolean, $search: String, $page: Int) {
        fetchTravelproducts(isSoldout: $isSoldout, search: $search, page: $page) {
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
            }
            buyer {
                _id
                email
                name
                picture
                # userPoint
            }
            seller {
                _id
                email
                name
                picture
                # userPoint
            }
            soldAt
            createdAt
            updatedAt
            deletedAt
            __typename
        }
    }
`;

export const DELETE_TRAVEL_PRODUCT = gql`
    mutation deleteTravelproduct($travelproductId: ID!) {
        deleteTravelproduct(travelproductId: $travelproductId)
    }
`;

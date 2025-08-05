import { gql } from "@apollo/client";

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

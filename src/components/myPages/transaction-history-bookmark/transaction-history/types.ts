import { FetchTravelproductsISoldQuery } from "@/commons/graphql/graphql";
import { ApolloQueryResult, OperationVariables } from "@apollo/client";

export interface ITransactionHistoryProps {
    iSold: FetchTravelproductsISoldQuery;
    refetch: (variables?: Partial<OperationVariables>) => Promise<ApolloQueryResult<any>>;
}

export interface IUseTransactionHistoryProps {
    refetch: (variables?: Partial<OperationVariables>) => Promise<ApolloQueryResult<any>>;
}

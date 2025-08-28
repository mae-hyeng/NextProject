import { FetchTravelproductsIPickedQuery } from "@/commons/graphql/graphql";
import { ApolloQueryResult, OperationVariables } from "@apollo/client";

export interface IBookmarkProps {
    iPick: FetchTravelproductsIPickedQuery;
    refetch: (variables?: Partial<OperationVariables>) => Promise<ApolloQueryResult<any>>;
}

export interface IUseBookmarkProps {
    refetch: (variables?: Partial<OperationVariables>) => Promise<ApolloQueryResult<any>>;
}

import { ApolloQueryResult, OperationVariables } from "@apollo/client";

export interface IPointUsageHistoryPaginationProps {
    lastPage: number;
    refetch: (variables?: Partial<OperationVariables>) => Promise<ApolloQueryResult<any>>;
}

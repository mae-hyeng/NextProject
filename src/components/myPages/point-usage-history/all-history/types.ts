import { FetchPointTransactionsQuery } from "@/commons/graphql/graphql";
import { ApolloQueryResult, OperationVariables } from "@apollo/client";

export interface IAllHistoryProps {
    pointTransaction: FetchPointTransactionsQuery;
    allCounts: number;
    refetch: (variables?: Partial<OperationVariables>) => Promise<ApolloQueryResult<any>>;
}

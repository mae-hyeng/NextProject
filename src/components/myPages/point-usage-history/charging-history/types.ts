import {
    FetchPointTransactionsCountOfLoadingQuery,
    FetchPointTransactionsOfLoadingQuery,
} from "@/commons/graphql/graphql";
import { ApolloQueryResult, OperationVariables } from "@apollo/client";

export interface IChargingHistoryProps {
    loading: FetchPointTransactionsOfLoadingQuery;
    loadingCount: FetchPointTransactionsCountOfLoadingQuery;
    refetch: (variables?: Partial<OperationVariables>) => Promise<ApolloQueryResult<any>>;
}

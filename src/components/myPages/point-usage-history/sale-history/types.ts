import {
    FetchPointTransactionsCountOfSellingQuery,
    FetchPointTransactionsOfSellingQuery,
} from "@/commons/graphql/graphql";
import { ApolloQueryResult, OperationVariables } from "@apollo/client";

export interface ISaleHistoryProps {
    selling: FetchPointTransactionsOfSellingQuery;
    sellingCount: FetchPointTransactionsCountOfSellingQuery;
    refetch: (variables?: Partial<OperationVariables>) => Promise<ApolloQueryResult<any>>;
}

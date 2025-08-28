import {
    FetchPointTransactionsOfBuyingQuery,
    FetchPointTransactionsCountOfBuyingQuery,
} from "@/commons/graphql/graphql";
import { ApolloQueryResult, OperationVariables } from "@apollo/client";

export interface IPurchaseHistory {
    buying: FetchPointTransactionsOfBuyingQuery;
    buyingCount: FetchPointTransactionsCountOfBuyingQuery;
    refetch: (variables?: Partial<OperationVariables>) => Promise<ApolloQueryResult<any>>;
}

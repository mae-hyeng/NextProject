import { ApolloQueryResult, OperationVariables } from "@apollo/client";

export interface IPaginationProps {
    refetch: (variables?: Partial<OperationVariables>) => Promise<ApolloQueryResult<any>>;
    lastPage: number;
}

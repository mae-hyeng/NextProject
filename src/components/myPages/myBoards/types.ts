import { ApolloQueryResult, OperationVariables } from "@apollo/client";

export interface IMyBoardsProps {
    refetch: (variables?: Partial<OperationVariables>) => Promise<ApolloQueryResult<any>>;
}

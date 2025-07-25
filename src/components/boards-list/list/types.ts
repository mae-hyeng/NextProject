import { ApolloQueryResult, OperationVariables } from "@apollo/client";
import { IPaginationProps } from "./../pagination/types";
import { FetchBoardsQuery } from "@/commons/graphql/graphql";

export type IBoardListProps = {
    data?: FetchBoardsQuery;
    boardsCountRefetch: (
        variables?: Partial<OperationVariables>
    ) => Promise<ApolloQueryResult<any>>;
} & IPaginationProps;

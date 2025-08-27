import { ApolloQueryResult, OperationVariables } from "@apollo/client";
import { IPaginationProps } from "./../pagination/types";
import { FetchBoardsQuery } from "@/commons/graphql/graphql";
import { Dispatch, SetStateAction } from "react";

export type IBoardListProps = {
    data?: FetchBoardsQuery;
    bestBoards: any;
    boardsCountRefetch: (
        variables?: Partial<OperationVariables>
    ) => Promise<ApolloQueryResult<any>>;
} & IPaginationProps;

export interface IUseBoardListProps {
    refetch: (variables?: Partial<OperationVariables>) => Promise<ApolloQueryResult<any>>;
    boardsCountRefetch: (
        variables?: Partial<OperationVariables>
    ) => Promise<ApolloQueryResult<any>>;
    setCurrentPage: Dispatch<SetStateAction<number>>;
}

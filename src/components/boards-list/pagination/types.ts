import { ApolloQueryResult, OperationVariables } from "@apollo/client";
import { Dispatch, SetStateAction } from "react";

export interface IPaginationProps {
    refetch: (variables?: Partial<OperationVariables>) => Promise<ApolloQueryResult<any>>;
    lastPage: number;
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
}

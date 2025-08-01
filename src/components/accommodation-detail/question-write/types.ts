import { TravelproductQuestion } from "@/commons/graphql/graphql";
import { ApolloQueryResult, OperationVariables } from "@apollo/client";
import { Dispatch, SetStateAction } from "react";

export interface IQuestionWriteProps {
    isEdit: boolean;
    setIsEdit?: Dispatch<SetStateAction<boolean>>;
    question?: TravelproductQuestion;
    refetchQuestionData: (
        variables?: Partial<OperationVariables>
    ) => Promise<ApolloQueryResult<any>>;
}

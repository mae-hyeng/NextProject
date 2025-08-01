import { TravelproductQuestion, TravelproductQuestionAnswer } from "@/commons/graphql/graphql";
import { ApolloQueryResult, OperationVariables } from "@apollo/client";
import { Dispatch, SetStateAction } from "react";

export interface IReplyWriteProps {
    isEdit?: Boolean;
    setIsEdit?: Dispatch<SetStateAction<boolean>>;
    question?: TravelproductQuestion;
    setIsShow?: Dispatch<SetStateAction<boolean>>;
    refetchQuestionData?: (
        variables?: Partial<OperationVariables>
    ) => Promise<ApolloQueryResult<any>>;
    reply?: any;
    refetchReplyData?: (variables?: Partial<OperationVariables>) => Promise<ApolloQueryResult<any>>;
    replyData?: TravelproductQuestionAnswer;
}

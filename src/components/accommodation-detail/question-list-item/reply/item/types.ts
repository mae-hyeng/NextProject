import {
    Travelproduct,
    TravelproductQuestion,
    TravelproductQuestionAnswer,
} from "@/commons/graphql/graphql";
import { ApolloQueryResult, OperationVariables } from "@apollo/client";

export interface IUseReplyListItem {
    reply?: TravelproductQuestionAnswer;
    question: TravelproductQuestion;
    refetchQuestionData: (
        variables?: Partial<OperationVariables>
    ) => Promise<ApolloQueryResult<any>>;
    refetchReplyData?: (variables?: Partial<OperationVariables>) => Promise<ApolloQueryResult<any>>;
}

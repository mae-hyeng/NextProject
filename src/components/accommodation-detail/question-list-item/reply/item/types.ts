import { TravelproductQuestion, TravelproductQuestionAnswer } from "@/commons/graphql/graphql";

export interface IReplyListItem {
    reply?: TravelproductQuestionAnswer;
    question: TravelproductQuestion;
    isSame: boolean;
}

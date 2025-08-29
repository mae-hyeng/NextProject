import {
    FetchTravelproductQuery,
    TravelproductQuestion,
    TravelproductQuestionAnswer,
} from "@/commons/graphql/graphql";

export interface IReplyListItem {
    data: FetchTravelproductQuery;
    reply?: TravelproductQuestionAnswer;
    question: TravelproductQuestion;
    isSame: boolean;
}

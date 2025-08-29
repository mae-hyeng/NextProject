import {
    FetchTravelproductQuery,
    FetchTravelproductQuestionsQuery,
} from "@/commons/graphql/graphql";

export interface IQuestionListItemProps {
    data: FetchTravelproductQuery;
    question: FetchTravelproductQuestionsQuery["fetchTravelproductQuestions"][0];
}

export interface IUseQuestionListItemProps extends IQuestionListItemProps {}

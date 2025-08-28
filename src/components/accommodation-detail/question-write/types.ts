import { TravelproductQuestion } from "@/commons/graphql/graphql";
import { Dispatch, SetStateAction } from "react";

export interface IQuestionWriteProps {
    isEdit: boolean;
    setIsEdit?: Dispatch<SetStateAction<boolean>>;
    question?: TravelproductQuestion;
}

export interface IUseQuestionWriteProps {
    question: TravelproductQuestion;
    setIsEdit: Dispatch<SetStateAction<boolean>>;
}

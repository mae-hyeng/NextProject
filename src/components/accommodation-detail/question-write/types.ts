import { TravelproductQuestion } from "@/commons/graphql/graphql";
import { Dispatch, SetStateAction } from "react";

export interface IQuestionWriteProps {
    isEdit: boolean;
    setIsEdit?: Dispatch<SetStateAction<boolean>>;
    question?: TravelproductQuestion;
}

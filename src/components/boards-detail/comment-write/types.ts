import { BoardComment } from "@/commons/graphql/graphql";
import { Dispatch, SetStateAction } from "react";

export interface ICommentWriteProps {
    isEdit: boolean;
    setIsEdit?: Dispatch<SetStateAction<boolean>>;
    comment?: BoardComment;
}

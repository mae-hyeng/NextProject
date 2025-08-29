import { BoardComment, FetchBoardCommentsQuery } from "@/commons/graphql/graphql";
import { Dispatch, SetStateAction } from "react";

export interface ICommentWriteProps {
    isEdit: boolean;
    setIsEdit?: Dispatch<SetStateAction<boolean>>;
    comment?: BoardComment;
}

export interface IUseBoardCommentWriteProps {
    comment: BoardComment;
    isEdit: boolean;
    setIsEdit: Dispatch<SetStateAction<boolean>>;
    reset: any;
    setValue: any;
}

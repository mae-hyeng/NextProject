import { FetchBoardQuery, UpdateBoardInput } from "@/commons/graphql/graphql";

export interface IBoardWriteProps {
    isEdit: boolean;
    data?: FetchBoardQuery;
}

export interface IMyVariables {
    updateBoardInput: UpdateBoardInput;
    password: string;
    boardId: any;
}

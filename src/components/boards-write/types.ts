import { FetchBoardQuery, UpdateBoardInput } from "@/commons/graphql/graphql";

export interface IBoardWriteProps {
    isEdit: boolean;
    data?: FetchBoardQuery;
}

export interface IUseBoardWriteProps {
    data: FetchBoardQuery;
    reset: any;
    setValue: any;
}

export interface IBoardVariables {
    updateBoardInput: UpdateBoardInput;
    password: string;
    boardId: string;
}

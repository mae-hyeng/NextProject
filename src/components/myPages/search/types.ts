import { ChangeEvent } from "react";

export interface IMyBoardsSearchProps {
    onChangeKeyword: (e: ChangeEvent<HTMLInputElement>) => void;
}

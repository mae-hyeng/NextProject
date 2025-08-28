import { ChangeEvent } from "react";

export interface ITransactionHistoryBookmarkSearchProps {
    onChangeKeyword: (e: ChangeEvent<HTMLInputElement>) => void;
}

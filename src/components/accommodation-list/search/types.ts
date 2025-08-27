import { ChangeEvent } from "react";

export interface IAccommodationSearchProps {
    onChangeKeyword: (e: ChangeEvent<HTMLInputElement>) => void;
}

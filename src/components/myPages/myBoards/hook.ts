import _ from "lodash";
import { ChangeEvent } from "react";
import { IMyBoardsProps } from "./types";

export const useMyBoards = ({ refetch }: IMyBoardsProps) => {
    const getDebounce = _.debounce((value) => {
        refetch({ search: value, page: 1 });
    }, 500);

    const onChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
        getDebounce(e.target.value);
    };

    return {
        onChangeKeyword,
    };
};

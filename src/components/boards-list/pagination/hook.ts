import { MouseEvent, useState } from "react";
import { IUsePaginationProps } from "./types";

export const usePagiNation = ({ refetch, lastPage, setCurrentPage }: IUsePaginationProps) => {
    const [startPage, setStartPage] = useState(1);

    const onClickPrevPage = () => {
        if (startPage === 1) return;

        setCurrentPage(startPage - 10);
        setStartPage(startPage - 10);
        refetch({ page: startPage - 10 });
    };

    const onClickNextPage = () => {
        if (startPage + 10 > lastPage) return;

        setCurrentPage(Number(startPage + 10));
        setStartPage(startPage + 10);
        refetch({ page: startPage + 10 });
    };

    const onClickPage = (e: MouseEvent<HTMLSpanElement>) => {
        setCurrentPage(Number(e.currentTarget.id));

        refetch({ page: Number(e.currentTarget.id) });
    };

    return {
        startPage,
        onClickPrevPage,
        onClickNextPage,
        onClickPage,
    };
};

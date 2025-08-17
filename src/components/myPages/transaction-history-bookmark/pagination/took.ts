import { useState } from "react";

export const useTransactionHistoryBookmarkPagination = ({ lastPage }) => {
    const [startPage, setStartPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const onClickPrevPage = () => {
        if (startPage === 1) return;

        setCurrentPage(startPage - 10);
        setStartPage(startPage - 10);
    };
    const onClickNextPage = () => {
        if (startPage + 10 > lastPage) return;

        setCurrentPage(Number(startPage + 10));
        setStartPage(startPage + 10);
    };
    const onClickPage = (e) => {
        setCurrentPage(Number(e.currentTarget.id));
    };

    return {
        startPage,
        currentPage,
        onClickPrevPage,
        onClickNextPage,
        onClickPage,
    };
};

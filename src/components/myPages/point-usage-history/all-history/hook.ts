import { useState } from "react";

export const usePointUsageHistoryAllHistory = ({ buying, loading, selling }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const allHistory = buying?.fetchPointTransactionsOfBuying
        .concat(loading?.fetchPointTransactionsOfLoading)
        .concat(selling?.fetchPointTransactionsOfSelling);

    allHistory?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    console.log(allHistory);

    return {
        allHistory,
        currentPage,
        setCurrentPage,
    };
};

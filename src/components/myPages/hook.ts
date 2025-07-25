import { useState } from "react";

export const useMyPages = () => {
    const [category, setCategory] = useState("transactionHistoryBookmark");

    const onClickCategory = (type) => {
        setCategory(type);
    };

    return {
        category,
        onClickCategory,
    };
};

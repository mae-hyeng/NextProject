import { useState } from "react";

export const useTransactionHistoryBookmark = () => {
    const [selected, setSelected] = useState("myProduct");

    const onClickButton = (type) => {
        setSelected(type);
    };

    return {
        selected,
        onClickButton,
    };
};

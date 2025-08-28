import { useState } from "react";

export const useTransactionHistoryBookmark = () => {
    const [selected, setSelected] = useState("myProduct");

    const onClickButton = (type: string) => {
        setSelected(type);
    };

    return {
        selected,
        onClickButton,
    };
};

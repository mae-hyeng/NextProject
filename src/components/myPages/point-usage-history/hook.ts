import { useState } from "react";

export const usePointUsageHistory = () => {
    const [selected, setSelected] = useState("allHistory");

    const onClickButton = (type) => {
        setSelected(type);
    };

    return {
        selected,
        onClickButton,
    };
};

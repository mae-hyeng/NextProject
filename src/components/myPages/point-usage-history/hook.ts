import { useState } from "react";

export const usePointUsageHistory = () => {
    const [selected, setSelected] = useState("allHistory");

    const onClickButton = (type: string) => {
        setSelected(type);
    };

    return {
        selected,
        onClickButton,
    };
};

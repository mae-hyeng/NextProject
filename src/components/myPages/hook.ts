import { useAuthStore } from "@/commons/stores/authStore";
import { useEffect, useState } from "react";

export const useMyPages = () => {
    const [category, setCategory] = useState("transactionHistoryBookmark");
    const [user, setUser] = useState(null);

    const { user: authUser } = useAuthStore();

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
    }, [authUser]);

    const onClickCategory = (type) => {
        setCategory(type);
    };

    return {
        user,
        category,
        onClickCategory,
    };
};

import { useEffect, useState } from "react";

import { useAuthStore } from "@/commons/stores/authStore";

export const UseBoardCommentListItem = () => {
    const [user, setUser] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const { user: authUser } = useAuthStore();

    const onClickCommentEdit = () => setIsEdit(true);

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
    }, [authUser]);

    return {
        user,
        isEdit,
        setIsEdit,
        onClickCommentEdit,
    };
};

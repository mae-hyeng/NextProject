import "@ant-design/v5-patch-for-react-19";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/commons/stores/authStore";
import { IUseQuestionListItemProps } from "./types";

export const useQuestionListItem = ({ data, question }: IUseQuestionListItemProps) => {
    const [user, setUser] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [isSame, setIsSame] = useState(false);
    const [isShow, setIsShow] = useState(false);

    const onClickQuestionEdit = () => setIsEdit(true);

    const { user: authUser } = useAuthStore();

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
    }, [authUser]);

    useEffect(() => {
        setIsSame(data?.fetchTravelproduct.seller._id === user?._id);
    }, [user, data]);

    const onClickReply = () => {
        setIsShow(!isShow);
    };

    return {
        user,
        isEdit,
        isSame,
        isShow,
        setIsShow,
        setIsEdit,
        onClickQuestionEdit,
        onClickReply,
    };
};

import "@ant-design/v5-patch-for-react-19";
import { useState } from "react";

export const useReplyListItem = () => {
    const [isEdit, setIsEdit] = useState(false);

    const onClickReplyEdit = () => setIsEdit(true);

    return {
        isEdit,
        setIsEdit,
        onClickReplyEdit,
    };
};

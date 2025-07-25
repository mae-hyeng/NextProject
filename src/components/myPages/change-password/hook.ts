"use client";

import "@ant-design/v5-patch-for-react-19";
import { Modal } from "antd";
import { useState } from "react";

export const useChangePassword = () => {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isSame, setIsSame] = useState(false);

    const onChangeInput = (e) => {
        const { name, value } = e.target;

        if (name === "password") setPassword(value);
        if (name === "newPassword") setNewPassword(value);

        if (password === newPassword) setIsSame(true);
    };

    const onClickButton = () => {
        if (password === newPassword) {
            Modal.success({
                content: "비밀번호가 변경 되었습니다.",
            });
        } else {
            Modal.error({
                content: "비밀번호가 맞지 않습니다. 다시 확인해 주세요.",
            });
        }
    };

    return {
        password,
        newPassword,
        isSame,
        onChangeInput,
        onClickButton,
    };
};

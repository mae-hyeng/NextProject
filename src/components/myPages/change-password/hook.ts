"use client";

import { RESET_USER_PASSWORD } from "@/commons/hooks/queries";
import "@ant-design/v5-patch-for-react-19";
import { useMutation } from "@apollo/client";
import { Modal } from "antd";

export const useChangePassword = () => {
    const [resetUserPassword] = useMutation(RESET_USER_PASSWORD);

    const onClickButton = async (data) => {
        try {
            if (data.password !== data.newPassword) {
                return Modal.error({
                    content: "비밀번호가 맞지 않습니다. 다시 확인해 주세요.",
                });
            }

            await resetUserPassword({ variables: { password: data.newPassword } });
            Modal.success({
                content: "비밀번호가 변경 되었습니다.",
                onOk: () => window.location.reload(),
            });
        } catch (error) {
            Modal.error({
                content: `${error}`,
            });
        }
    };

    return {
        onClickButton,
    };
};

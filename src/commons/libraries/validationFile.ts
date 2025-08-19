import { Modal } from "antd";
import "@ant-design/v5-patch-for-react-19";

export const checkValidationFile = (file?: File) => {
    if (typeof file === "undefined") {
        Modal.error({
            content: "파일이 없습니다",
            onOk: () => {
                return false;
            },
        });
    }
    if (file.size > 5 * 1024 * 1024) {
        Modal.error({
            content: "파일 용량이 너무 큽니다.(제한 5MB)",
            onOk: () => {
                return false;
            },
        });
    }

    return true;
};

import { ModalProps } from "@mui/material/Modal";
import { ReactNode } from "react";

export interface IPointChargeModalUIProps {
    open: boolean;
    onClose: ModalProps["onClose"];
    children: ReactNode;
}

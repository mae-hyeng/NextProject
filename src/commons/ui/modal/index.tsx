"use client";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from "./styles.module.css";

export const ModalUI = ({ open, onClose, children }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box className={styles.modal_wrapper}>{children}</Box>
        </Modal>
    );
};

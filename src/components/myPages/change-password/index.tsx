"use client";

import styles from "./styles.module.css";
import { useChangePassword } from "./hook";

export const ChangePassword = () => {
    const { password, newPassword, isSame, onChangeInput, onClickButton } = useChangePassword();

    return (
        <>
            <h3>비밀번호 변경</h3>
            <div className={styles.password_wrapper}>
                <div>
                    새 비밀번호<span className={styles.require_input}>*</span>
                </div>
                <input
                    onChange={onChangeInput}
                    name="password"
                    value={password}
                    placeholder="새 비밀번호를 입력해 주세요."
                />
            </div>
            <div className={styles.password_wrapper}>
                <div>
                    새 비밀번호 확인<span className={styles.require_input}>*</span>
                </div>
                <input
                    onChange={onChangeInput}
                    name="newPassword"
                    value={newPassword}
                    placeholder="새 비밀번호를 확인해 주세요."
                />
            </div>
            <div className={styles.button_wrapper}>
                <button onClick={onClickButton} disabled={isSame ? false : true}>
                    비밀번호 변경
                </button>
            </div>
        </>
    );
};

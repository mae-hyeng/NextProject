"use client";

import styles from "./styles.module.css";
import { useChangePassword } from "./hook";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";

export const ChangePassword = () => {
    const { onClickButton } = useChangePassword();

    const { handleSubmit, register, formState } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    return (
        <>
            <form onSubmit={handleSubmit(onClickButton)} className={styles.changePassword_wrapper}>
                <h3>비밀번호 변경</h3>
                <div className={styles.password_wrapper}>
                    <div>
                        새 비밀번호<span className={styles.require_input}>*</span>
                    </div>
                    <input {...register("password")} placeholder="새 비밀번호를 입력해 주세요." />
                    <div className={styles.error}>{formState.errors.password?.message}</div>
                </div>
                <div className={styles.password_wrapper}>
                    <div>
                        새 비밀번호 확인<span className={styles.require_input}>*</span>
                    </div>
                    <input
                        {...register("newPassword")}
                        placeholder="새 비밀번호를 확인해 주세요."
                    />
                    <div className={styles.error}>{formState.errors.newPassword?.message}</div>
                </div>
                <div className={styles.button_wrapper}>
                    <button disabled={!formState.isValid}>비밀번호 변경</button>
                </div>
            </form>
        </>
    );
};

"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { useSignIn } from "./hook";

export const SignIn = () => {
    const {
        emailError,
        nameError,
        passwordError,
        passwordCheckError,
        onClickSignIn,
        onChangeInput,
    } = useSignIn();
    return (
        <div className={styles.signIn}>
            <div className={styles.signIn_left_wrapper}>
                <h2 className={styles.t_a_c}>회원가입</h2>
                <h3 className={styles.t_a_c}>회원가입을 위해 아래 빈칸을 모두 채워주세요.</h3>

                <div>
                    이메일<span className={styles.require_input}>*</span>
                </div>
                <input
                    name="email"
                    onChange={onChangeInput}
                    placeholder="이메일을 입력해 주세요."
                />
                {emailError && <p className={styles.error}>{emailError}</p>}

                <div>
                    이름<span className={styles.require_input}>*</span>
                </div>
                <input name="name" onChange={onChangeInput} placeholder="이름을 입력해 주세요." />
                {nameError && <p className={styles.error}>{nameError}</p>}

                <div>
                    비밀번호<span className={styles.require_input}>*</span>
                </div>
                <input
                    name="password"
                    onChange={onChangeInput}
                    type="password"
                    placeholder="비밀번호를 입력해 주세요."
                />
                {passwordError && <p className={styles.error}>{passwordError}</p>}

                <div>
                    비밀번호 확인<span className={styles.require_input}>*</span>
                </div>
                <input
                    name="password-check"
                    onChange={onChangeInput}
                    type="password"
                    placeholder="비밀번호를 입력해 주세요."
                />
                {passwordCheckError && <p className={styles.error}>{passwordCheckError}</p>}

                <button onClick={onClickSignIn} className={styles.signIn_button}>
                    회원가입
                </button>
            </div>
            <div className={styles.signIn_right_wrapper}>
                <Image
                    src={"/images/login-image.png"}
                    alt="회원가입화면이미지"
                    className={styles.signIn_image}
                    width={1000}
                    height={0}
                />
            </div>
        </div>
    );
};

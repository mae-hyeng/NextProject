"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { UseLogin } from "./hook";

export const Login = () => {
    const { emailError, passwordError, onChangeInput, onClickLogin, onClickSignIn } = UseLogin();
    return (
        <div className={styles.logIn}>
            <div className={styles.login_left_wrapper}>
                <Image
                    src={"/images/logo.png"}
                    alt="로고이미지"
                    className={styles.logo_image}
                    width={100}
                    height={100}
                />
                <h2>트립트립에 오신걸 환영합니다</h2>
                <h3>트립트립에 로그인 하세요.</h3>
                <input
                    onChange={onChangeInput}
                    className={emailError ? styles.error : ""}
                    name="email"
                    placeholder="이메일을 입력해 주세요."
                />
                <input
                    onChange={onChangeInput}
                    className={passwordError ? styles.error : ""}
                    name="password"
                    type="password"
                    placeholder="비밀번호를 입력해 주세요."
                />
                <button onClick={onClickLogin} className={styles.login_button}>
                    로그인
                </button>
                <button onClick={onClickSignIn} className={styles.signIn_button}>
                    회원가입
                </button>
            </div>
            <div className={styles.login_right_wrapper}>
                <Image
                    src={"/images/login-image.png"}
                    alt="로그인화면이미지"
                    className={styles.login_image}
                    width={1000}
                    height={0}
                />
            </div>
        </div>
    );
};

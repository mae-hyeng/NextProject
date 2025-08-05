"use client";

import React from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import { useNavigation } from "./hook";
import { usePathname } from "next/navigation";
import { useQuery } from "@apollo/client";
import { FETCH_USER_LOGGED_IN } from "@/components/login/queries";
import { NavigationLogin } from "@/components/navigation-login";

export const Navigation = () => {
    const pathName = usePathname();
    const hideRoutes = ["/login", "/signIn"];

    const { data } = useQuery(FETCH_USER_LOGGED_IN);
    const { isLogin, navigation, onClickNavigation, onclickLogin } = useNavigation({ data });

    if (hideRoutes.includes(pathName)) return;

    return (
        <div className={styles.header}>
            <div className={styles.left_header}>
                <Image src="/images/logo.png" alt="로고" width={50} height={0} />
                <div
                    onClick={() => onClickNavigation("/boards")}
                    className={`${styles.header_category} ${
                        navigation.includes("/boards") ? styles.selected : ""
                    }`}
                >
                    트립토크
                </div>
                <div
                    onClick={() => onClickNavigation("/accommodation")}
                    className={`${styles.header_category} ${
                        navigation.includes("/accommodation") ? styles.selected : ""
                    }`}
                >
                    숙박권 구매
                </div>
                <div
                    onClick={() => onClickNavigation("/mypage")}
                    className={`${styles.header_category} ${
                        navigation.includes("/mypage") ? styles.selected : ""
                    }`}
                >
                    마이 페이지
                </div>
            </div>
            {isLogin ? (
                <div className={styles.right_header}>
                    <NavigationLogin data={data} />
                </div>
            ) : (
                <button onClick={onclickLogin} className={styles.login_button}>
                    로그인 {">"}
                </button>
            )}
        </div>
    );
};

"use client";

import { useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";

export const LoginCheck =
    <P extends object>(Component: ComponentType<P>) =>
    (props: P) => {
        const router = useRouter();

        useEffect(() => {
            if (localStorage.getItem("accessToken") === null) {
                // alert("로그인 후 이용 가능합니다");
                // router.push("/login");
            }
        }, []);

        return <Component {...props} />;
    };

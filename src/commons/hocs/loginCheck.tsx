"use client";

import { useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";
import { useAccessTokenStore } from "../stores/accessTokenStore";
import { useLoadStore } from "../stores/loadStore";

export const LoginCheck =
    <P extends object>(Component: ComponentType<P>) =>
    (props: P) => {
        const router = useRouter();
        const { accessToken } = useAccessTokenStore();
        const { isLoaded } = useLoadStore();

        useEffect(() => {
            if (!isLoaded) return;
            if (accessToken) return;

            alert("로그인 후 이용 가능합니다");
            router.push("/login");
        }, [isLoaded]);

        return <Component {...props} />;
    };

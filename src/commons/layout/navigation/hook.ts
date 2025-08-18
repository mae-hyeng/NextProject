import { useAccessTokenStore } from "@/commons/stores/accessTokenStore";
import { useAuthStore } from "@/commons/stores/authStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useNavigation = ({ data }) => {
    const pathName = usePathname();
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(false);

    const [navigation, setNavigation] = useState(pathName);

    const { accessToken } = useAccessTokenStore();
    const { setUser, clearUser } = useAuthStore();

    useEffect(() => {
        setNavigation(pathName);
    }, [pathName]);

    useEffect(() => {
        if (!accessToken) {
            setIsLogin(false);
            clearUser();
            localStorage.removeItem("userInfo");
        } else {
            setIsLogin(true);
            setUser(data.fetchUserLoggedIn);
            localStorage.setItem("userInfo", JSON.stringify(data.fetchUserLoggedIn));
        }
    }, [data]);

    const onClickNavigation = (page) => {
        router.push(page);
    };

    const onclickLogin = () => {
        router.push("/login");
    };

    return {
        isLogin,
        navigation,
        onClickNavigation,
        onclickLogin,
    };
};

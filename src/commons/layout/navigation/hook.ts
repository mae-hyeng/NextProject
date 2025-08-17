import { getAccessToken } from "@/commons/libraries/getAccessToken";
import { useAccessTokenStore } from "@/commons/stores/accessTokenStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useNavigation = ({ data }) => {
    const pathName = usePathname();
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(false);

    const [navigation, setNavigation] = useState(pathName);

    const { accessToken } = useAccessTokenStore();

    useEffect(() => {
        setNavigation(pathName);
    }, [pathName]);

    useEffect(() => {
        if (!accessToken) {
            setIsLogin(false);
            localStorage.removeItem("userInfo");
        } else {
            setIsLogin(true);
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

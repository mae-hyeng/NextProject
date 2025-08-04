import { getAccessToken } from "@/commons/libraries/getAccessToken";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useNavigation = ({ data }) => {
    const pathName = usePathname();
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(false);

    const [navigation, setNavigation] = useState(pathName);

    useEffect(() => {
        setNavigation(pathName);
    }, [pathName]);

    useEffect(() => {
        if (getAccessToken() === null) setIsLogin(false);
        else setIsLogin(true);
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

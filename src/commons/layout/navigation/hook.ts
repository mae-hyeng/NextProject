import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useNavigation = () => {
    const pathName = usePathname();
    const router = useRouter();

    const [navigation, setNavigation] = useState(pathName);

    useEffect(() => {
        setNavigation(pathName);
    }, [pathName]);

    const onClickNavigation = (page) => {
        router.push(page);
    };

    return {
        navigation,
        onClickNavigation,
    };
};

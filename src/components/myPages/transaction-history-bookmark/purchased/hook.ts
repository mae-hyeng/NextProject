import { useRouter } from "next/navigation";

export const usePurchased = () => {
    const router = useRouter();

    const onClickPurchased = (pId) => () => {
        router.push(`accommodation/detail/${pId}`);
    };

    return {
        onClickPurchased,
    };
};

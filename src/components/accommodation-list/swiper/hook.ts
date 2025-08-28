import { useRouter } from "next/navigation";

export const useImageSwiper = () => {
    const router = useRouter();

    const onClickBestProduct = (productId: string) => () => {
        router.push(`/accommodation/detail/${productId}`);
    };

    return {
        onClickBestProduct,
    };
};

import _ from "lodash";
import { useRouter } from "next/navigation";

export const useTransactionHistory = ({ refetch }) => {
    const router = useRouter();

    const getDebounce = _.debounce((value) => {
        refetch({ search: value, page: 1 });
    }, 500);

    const onChangeKeyword = (e) => {
        getDebounce(e.target.value);
    };

    const onClickPurchased = (pId) => () => {
        router.push(`accommodation/detail/${pId}`);
    };
    return {
        onChangeKeyword,
        onClickPurchased,
    };
};

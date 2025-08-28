import _ from "lodash";
import { useRouter } from "next/navigation";
import { IUseTransactionHistoryProps } from "./types";
import { ChangeEvent } from "react";

export const useTransactionHistory = ({ refetch }: IUseTransactionHistoryProps) => {
    const router = useRouter();

    const getDebounce = _.debounce((value) => {
        refetch({ search: value, page: 1 });
    }, 500);

    const onChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
        getDebounce(e.target.value);
    };

    const onClickPurchased = (pId: string) => () => {
        router.push(`accommodation/detail/${pId}`);
    };
    return {
        onChangeKeyword,
        onClickPurchased,
    };
};

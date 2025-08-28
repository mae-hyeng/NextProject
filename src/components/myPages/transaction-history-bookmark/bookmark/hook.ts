import _ from "lodash";
import { useRouter } from "next/navigation";
import { IUseBookmarkProps } from "./types";
import { ChangeEvent } from "react";

export const useBookmark = ({ refetch }: IUseBookmarkProps) => {
    const router = useRouter();

    const getDebounce = _.debounce((value) => {
        refetch({ search: value, page: 1 });
    }, 500);

    const onChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
        getDebounce(e.target.value);
    };

    const onClickBookMark = (pId: string) => () => {
        router.push(`accommodation/detail/${pId}`);
    };

    return {
        onChangeKeyword,
        onClickBookMark,
    };
};

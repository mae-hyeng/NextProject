"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import _ from "lodash";

export const AccommodationList = ({ refetch, data, fetchMore }) => {
    const router = useRouter();
    const [keyword, setKeyword] = useState("");

    const [category, setCategory] = useState("reservationAvailable");
    const [isSoldout, setIsSoldout] = useState(false);

    useEffect(() => {
        refetch({ isSoldout });
    }, [isSoldout]);

    const [hasMore, setHasMore] = useState(true);

    const onClickAccommodation = (travelproductId) => {
        router.push(`/accommodation/detail/${travelproductId}`);
    };

    const onClickRegister = () => {
        router.push("/accommodation/new");
    };

    const getDebounce = _.debounce((value) => {
        refetch({ search: value, page: 1 });
        setKeyword(value);
        setHasMore(true);
    }, 500);

    const onChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
        getDebounce(e.target.value);
    };

    const onClickCategory = (type) => {
        setCategory(type);
        setIsSoldout(type === "reservationAvailable" ? false : true);
        setHasMore(true);
    };

    const onNext = () => {
        if (!data) return;

        fetchMore({
            variables: {
                isSoldout: isSoldout,
                page: Math.ceil((data?.fetchTravelproducts.length ?? 10) / 10) + 1,
                search: keyword,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult.fetchTravelproducts?.length) {
                    setHasMore(false);
                    return;
                }

                return {
                    fetchTravelproducts: [
                        ...prev.fetchTravelproducts,
                        ...fetchMoreResult.fetchTravelproducts,
                    ],
                };
            },
        });
    };

    return {
        keyword,
        category,
        hasMore,
        onClickCategory,
        onClickAccommodation,
        onClickRegister,
        onChangeKeyword,
        onNext,
    };
};

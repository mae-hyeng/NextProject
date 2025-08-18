"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import _ from "lodash";

export const AccommodationList = (refetch) => {
    const router = useRouter();
    const [keyword, setKeyword] = useState("");

    const [category, setCategory] = useState("reservationAvailable");
    const [isSoldout, setIsSoldout] = useState(false);

    const [endDate, setEndDate] = useState(
        new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toLocaleDateString()
    );
    const [startDate, setStartDate] = useState(new Date().toLocaleDateString());

    useEffect(() => {
        refetch({ isSoldout });
    }, [isSoldout]);

    const onClickAccommodation = (travelproductId) => {
        router.push(`/accommodation/detail/${travelproductId}`);
    };

    const onClickRegister = () => {
        router.push("/accommodation/new");
    };

    const getDebounce = _.debounce((value, start, end) => {
        refetch({ search: value, page: 1 });
        setKeyword(value);
    }, 500);

    const onChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
        getDebounce(e.target.value, startDate, endDate);
    };

    const onChangeDatePicker = (_, dateString) => {
        const [start, end] = dateString;
        setStartDate(start);
        setEndDate(end);
        refetch({ search: keyword, page: 1 });
    };

    const onClickCategory = (type) => {
        setCategory(type);
        setIsSoldout(type === "reservationAvailable" ? false : true);
    };

    return {
        keyword,
        category,
        onClickCategory,
        onClickAccommodation,
        onClickRegister,
        onChangeKeyword,
        onChangeDatePicker,
    };
};

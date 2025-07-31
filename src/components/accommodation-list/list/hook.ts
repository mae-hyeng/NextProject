"use client";

import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import _ from "lodash";
import { DELETE_TRAVEL_PRODUCT, FETCH_TRAVEL_PRODUCTS } from "./queries";

export const AccommodationList = (data, refetch) => {
    const router = useRouter();
    const [deleteBoard] = useMutation(DELETE_TRAVEL_PRODUCT);

    const [keyword, setKeyword] = useState("");

    const [endDate, setEndDate] = useState(
        new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toLocaleDateString()
    );
    const [startDate, setStartDate] = useState(new Date().toLocaleDateString());

    const onClickAccommodation = (travelproductId) => {
        router.push(`/accommodation/detail/${travelproductId}`);
    };

    const onClickDeleteAccommodation = (travelproductId) => {
        if (confirm("정말 삭제하시겠습니까?")) {
            deleteBoard({
                variables: {
                    travelproductId: travelproductId,
                },
                refetchQueries: [{ query: FETCH_TRAVEL_PRODUCTS }],
            });
        }
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
        console.log(start, end);
        setStartDate(start);
        setEndDate(end);
        refetch({ search: keyword, page: 1 });
    };

    return {
        keyword,
        onClickAccommodation,
        onClickDeleteAccommodation,
        onClickRegister,
        onChangeKeyword,
        onChangeDatePicker,
    };
};

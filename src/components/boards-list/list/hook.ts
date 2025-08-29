"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import _ from "lodash";
import { useAuthStore } from "@/commons/stores/authStore";

import { IUseBoardListProps } from "./types";
import { Dayjs } from "dayjs";

export const useBoardsList = ({
    refetch,
    boardsCountRefetch,
    setCurrentPage,
}: IUseBoardListProps) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const { user: authUser } = useAuthStore();

    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
    }, [authUser]);

    const [startDate, setStartDate] = useState(
        new Date(new Date().setFullYear(new Date().getFullYear() - 1))
            .toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" })
            .replace(/\. /g, ".")
            .replace(/\.$/, "")
    );

    const [endDate, setEndDate] = useState(
        new Date()
            .toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" })
            .replace(/\. /g, ".")
            .replace(/\.$/, "")
    );

    const onClickBoard = (boardId) => () => {
        router.push(`/boards/detail/${boardId}`);
    };

    const onClickRegister = () => {
        router.push("/boards/new");
    };

    const getDebounce = _.debounce((value, start, end) => {
        refetch({ startDate: start, endDate: IncreaseDateDay(end), search: value, page: 1 });
        boardsCountRefetch({ startDate: start, endDate: IncreaseDateDay(end), search: value });
        setCurrentPage(1);
        setKeyword(value);
    }, 500);

    const onChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
        getDebounce(e.target.value, startDate, endDate);
    };

    const onChangeDatePicker = (_: Dayjs | null, dateString: string) => {
        const [start, end] = dateString;
        setStartDate(start);
        setEndDate(end);
        refetch({ startDate: start, endDate: IncreaseDateDay(end), search: keyword, page: 1 });
        boardsCountRefetch({ startDate: start, endDate: IncreaseDateDay(end), search: keyword });
    };

    const IncreaseDateDay = (dateStr: string) => {
        const day = parseInt(dateStr.slice(-2), 10);

        const newDay = day + 1;

        const newDayStr = newDay.toString().padStart(2, "0");

        return dateStr.slice(0, -2) + newDayStr;
    };

    return {
        user,
        keyword,
        onClickBoard,
        onClickRegister,
        onChangeKeyword,
        onChangeDatePicker,
    };
};

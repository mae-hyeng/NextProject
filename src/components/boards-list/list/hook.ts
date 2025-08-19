"use client";

import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { DeleteBoardDocument } from "@/commons/graphql/graphql";
import { ChangeEvent, useState } from "react";
import _ from "lodash";

export const BoardsList = ({ refetch, boardsCountRefetch, setCurrentPage }) => {
    const router = useRouter();
    const [deleteBoard] = useMutation(DeleteBoardDocument);

    const [keyword, setKeyword] = useState("");

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

    const onClickDeleteBoard = (boardId) => {
        if (confirm("정말 삭제하시겠습니까?")) {
            deleteBoard({
                variables: {
                    boardId: boardId,
                },
                update(cache, { data }) {
                    cache.modify({
                        fields: {
                            fetchBoards: (prev, { readField }) => {
                                const deletedId = data.deleteBoard;
                                const filteredBoard = prev.filter(
                                    (board) => readField("_id", board) !== deletedId
                                );
                                return [...filteredBoard];
                            },
                        },
                    });
                },
            });
        }
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

    const onChangeDatePicker = (_, dateString) => {
        const [start, end] = dateString;
        setStartDate(start);
        setEndDate(end);
        refetch({ startDate: start, endDate: IncreaseDateDay(end), search: keyword, page: 1 });
        boardsCountRefetch({ startDate: start, endDate: IncreaseDateDay(end), search: keyword });
    };

    const IncreaseDateDay = (dateStr) => {
        const day = parseInt(dateStr.slice(-2), 10);

        const newDay = day + 1;

        const newDayStr = newDay.toString().padStart(2, "0");

        return dateStr.slice(0, -2) + newDayStr;
    };

    return {
        keyword,
        onClickBoard,
        onClickDeleteBoard,
        onClickRegister,
        onChangeKeyword,
        onChangeDatePicker,
    };
};

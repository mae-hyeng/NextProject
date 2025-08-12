"use client";

import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { DeleteBoardDocument } from "@/commons/graphql/graphql";
import { ChangeEvent, useState } from "react";
import _ from "lodash";

export const BoardsList = ({ refetch, boardsCountRefetch }) => {
    const router = useRouter();
    const [deleteBoard] = useMutation(DeleteBoardDocument);

    const [keyword, setKeyword] = useState("");

    const [endDate, setEndDate] = useState(
        new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toLocaleDateString()
    );
    const [startDate, setStartDate] = useState(new Date().toLocaleDateString());

    const onClickBoard = (boardId) => {
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
        refetch({ endDate: end, startDate: start, search: value, page: 1 });
        boardsCountRefetch({ endDate: end, startDate: start, search: value });
        setKeyword(value);
    }, 500);

    const onChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
        getDebounce(e.target.value, startDate, endDate);
    };

    const onChangeDatePicker = (_, dateString) => {
        const [start, end] = dateString;
        setStartDate(start);
        setEndDate(end);
        refetch({ endDate: end, startDate: start, search: keyword, page: 1 });
        boardsCountRefetch({ endDate: end, startDate: start, search: keyword });
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

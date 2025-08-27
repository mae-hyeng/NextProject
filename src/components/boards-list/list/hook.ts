"use client";

import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { DeleteBoardDocument } from "@/commons/graphql/graphql";
import { ChangeEvent, useEffect, useState } from "react";
import _ from "lodash";
import { useAuthStore } from "@/commons/stores/authStore";
import { Modal } from "antd";
import "@ant-design/v5-patch-for-react-19";

export const BoardsList = ({ refetch, boardsCountRefetch, setCurrentPage }) => {
    const router = useRouter();
    const [deleteBoard] = useMutation(DeleteBoardDocument);
    const [user, setUser] = useState(null);
    const { user: authUser } = useAuthStore();

    const [keyword, setKeyword] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const [boardId, setBoardId] = useState("");

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

    const onClickDeleteBoard = async () => {
        try {
            await deleteBoard({
                variables: {
                    boardId,
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
            Modal.success({
                content: "게시물을 삭제했습니다!",
                onOk: () => setIsOpen(false),
            });
        } catch (error) {
            Modal.error({
                content: "게시물 삭제 권한이 없습니다.",
                onOk: () => {
                    setIsOpen(false);
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

    const showDeleteBoardModal = (boardId) => () => {
        setBoardId(boardId);
        setIsOpen(true);
    };

    const closeDeleteBoardModal = () => {
        setIsOpen(false);
    };

    return {
        user,
        keyword,
        isOpen,
        showDeleteBoardModal,
        closeDeleteBoardModal,
        onClickBoard,
        onClickDeleteBoard,
        onClickRegister,
        onChangeKeyword,
        onChangeDatePicker,
    };
};

"use client";

import { useParams, useRouter } from "next/navigation";

export const useBoardsDetail = () => {
    const router = useRouter();
    const params = useParams();

    const onClickToUpdate = () => {
        router.push(`/boards/detail/${params.boardId}/edit`);
    };

    const onClickToBoards = () => {
        router.push("/boards");
    };

    return {
        onClickToUpdate,
        onClickToBoards,
    };
};

"use client";

import { LoginCheck } from "@/commons/hocs/loginCheck";
import { FETCH_BOARD } from "@/commons/hooks/queries";
import { BoardsWrite } from "@/components/boards-write";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

const BoardEdit = () => {
    const params = useParams();

    const { data } = useQuery(FETCH_BOARD, {
        variables: { boardId: params.boardId },
    });
    return <BoardsWrite isEdit={true} data={data} />;
};

export default LoginCheck(BoardEdit);

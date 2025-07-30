"use client";

import { LoginCheck } from "@/commons/hocs/loginCheck";
import { BoardsWrite } from "@/components/boards-write";

const BoardsNew = () => {
    return <BoardsWrite isEdit={false} />;
};

export default LoginCheck(BoardsNew);

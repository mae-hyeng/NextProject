"use client";

import { FETCH_BOARD, FETCH_BOARD_COMMENTS } from "@/commons/apis/queries/queries";
import { CommentList } from "@/components/boards-detail/comment-list";
import { CommentWrite } from "@/components/boards-detail/comment-write";
import { BoardsDetail } from "@/components/boards-detail/detail";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

const BoardsDetailPage = () => {
    const params = useParams();

    const { data } = useQuery(FETCH_BOARD, {
        variables: { boardId: params.boardId },
    });

    const { data: comments } = useQuery(FETCH_BOARD_COMMENTS, {
        variables: {
            boardId: params.boardId,
        },
    });
    return (
        <>
            <BoardsDetail data={data} />
            <CommentWrite isEdit={false} />
            <CommentList data={data} comments={comments} />
        </>
    );
};

export default BoardsDetailPage;

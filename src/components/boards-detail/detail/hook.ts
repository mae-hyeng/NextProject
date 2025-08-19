"use client";

import { useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { DISLIKE_BOARD, LIKE_BOARD } from "./queries";
import { FETCH_BOARD } from "@/commons/hooks/queries";
import { Modal } from "antd";
import "@ant-design/v5-patch-for-react-19";

export const useBoardsDetail = ({ data }) => {
    const router = useRouter();
    const params = useParams();

    const [likeBoard] = useMutation(LIKE_BOARD);
    const [dislikeBoard] = useMutation(DISLIKE_BOARD);

    const onClickToUpdate = () => {
        router.push(`/boards/detail/${params.boardId}/edit`);
    };

    const onClickToBoards = () => {
        router.push("/boards");
    };

    const onClickLike = async () => {
        try {
            await likeBoard({
                variables: { boardId: params.boardId },
                optimisticResponse: { likeBoard: (data?.fetchBoard.likeCount ?? 0) + 1 },
                update: (cache, { data: likeData }) => {
                    cache.writeQuery({
                        query: FETCH_BOARD,
                        variables: { boardId: params.boardId },
                        data: {
                            fetchBoard: {
                                _id: params.boardId,
                                writer: data?.fetchBoard.writer,
                                title: data?.fetchBoard.title,
                                contents: data?.fetchBoard.contents,
                                youtubeUrl: data?.fetchBoard.youtubeUrl,
                                likeCount: likeData.likeBoard,
                                dislikeCount: data?.fetchBoard.dislikeCount,
                                images: data?.fetchBoard.images,
                                boardAddress: data?.fetchBoard.boardAddress,
                                createdAt: data?.fetchBoard.createdAt,
                                updatedAt: data?.fetchBoard.updatedAt,
                                deletedAt: data?.fetchBoard.deletedAt,
                                __typename: "Board",
                            },
                        },
                    });
                },
            });
        } catch (error) {
            Modal.error({
                content: `${error}`,
            });
        }
    };
    const onClickDislike = () => {
        dislikeBoard({
            variables: { boardId: params.boardId },
            optimisticResponse: { dislikeBoard: (data?.fetchBoard.dislikeCount ?? 0) + 1 },
            update: (cache, { data: dislikeData }) => {
                cache.writeQuery({
                    query: FETCH_BOARD,
                    variables: { boardId: params.boardId },
                    data: {
                        fetchBoard: {
                            _id: params.boardId,
                            writer: data?.fetchBoard.writer,
                            title: data?.fetchBoard.title,
                            contents: data?.fetchBoard.contents,
                            youtubeUrl: data?.fetchBoard.youtubeUrl,
                            likeCount: data?.fetchBoard.likeCount,
                            dislikeCount: dislikeData.dislikeBoard,
                            images: data?.fetchBoard.images,
                            boardAddress: data?.fetchBoard.boardAddress,
                            createdAt: data?.fetchBoard.createdAt,
                            updatedAt: data?.fetchBoard.updatedAt,
                            deletedAt: data?.fetchBoard.deletedAt,
                            __typename: "Board",
                        },
                    },
                });
            },
        });
    };

    return {
        onClickLike,
        onClickDislike,
        onClickToUpdate,
        onClickToBoards,
    };
};

"use client";

import {
    FETCH_BOARDS_OF_THE_BEST,
    FETCH_BOARDS,
    FETCH_BOARDS_COUNT,
} from "@/commons/apis/queries/queries";
import { BannerPage } from "@/components/boards-list/banner";
import { BoardsListPage } from "@/components/boards-list/list";
import { useQuery } from "@apollo/client";
import { useState } from "react";

const Page = () => {
    const { data, refetch } = useQuery(FETCH_BOARDS);

    const { data: boardsCount, refetch: boardsCountRefetch } = useQuery(FETCH_BOARDS_COUNT);

    const { data: bestBoards } = useQuery(FETCH_BOARDS_OF_THE_BEST);

    const lastPage = Math.ceil((boardsCount?.fetchBoardsCount ?? 10) / 10);

    const [currentPage, setCurrentPage] = useState(1);

    return (
        <>
            <BannerPage />
            <BoardsListPage
                data={data}
                bestBoards={bestBoards}
                refetch={refetch}
                boardsCountRefetch={boardsCountRefetch}
                lastPage={lastPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    );
};

export default Page;

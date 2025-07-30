"use client";

import { BannerPage } from "@/components/boards-list/banner";
import { BoardsListPage } from "@/components/boards-list/list";
import { FETCH_BOARDS } from "@/components/boards-list/list/queries";
import { FETCH_BOARDS_COUNT } from "@/components/boards-list/pagination/queries";
import { useQuery } from "@apollo/client";

const Page = () => {
    // const { data, refetch } = useQuery(FetchBoardsDocument);
    const { data, refetch } = useQuery(FETCH_BOARDS);

    const { data: boardsCount, refetch: boardsCountRefetch } = useQuery(FETCH_BOARDS_COUNT);

    const lastPage = Math.ceil((boardsCount?.fetchBoardsCount ?? 10) / 10);

    return (
        <>
            <BannerPage />
            <BoardsListPage
                data={data}
                refetch={refetch}
                boardsCountRefetch={boardsCountRefetch}
                lastPage={lastPage}
            />
        </>
    );
};

export default Page;

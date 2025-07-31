"use client";

import { AccommodationListPage } from "@/components/accommodation-list/list";
import { FETCH_TRAVEL_PRODUCTS } from "@/components/accommodation-list/list/queries";
import { BannerPage } from "@/components/boards-list/banner";
import { FETCH_BOARDS_COUNT } from "@/components/boards-list/pagination/queries";
import { useQuery } from "@apollo/client";

const Page = () => {
    const { data, refetch } = useQuery(FETCH_TRAVEL_PRODUCTS);

    return (
        <>
            <BannerPage />
            <AccommodationListPage data={data} refetch={refetch} />
        </>
    );
};

export default Page;

"use client";

import { FETCH_TRAVEL_PRODUCTS_OF_THE_BEST } from "@/commons/hooks/queries";
import { AccommodationListPage } from "@/components/accommodation-list/list";
import { FETCH_TRAVEL_PRODUCTS } from "@/components/accommodation-list/list/queries";
import { BannerPage } from "@/components/boards-list/banner";
import { useQuery } from "@apollo/client";

const Page = () => {
    const { data, refetch } = useQuery(FETCH_TRAVEL_PRODUCTS, {
        variables: {
            isSoldout: false,
        },
    });

    const { data: bestProducts } = useQuery(FETCH_TRAVEL_PRODUCTS_OF_THE_BEST);

    return (
        <>
            <BannerPage />
            <AccommodationListPage data={data} bestProducts={bestProducts} refetch={refetch} />
        </>
    );
};

export default Page;

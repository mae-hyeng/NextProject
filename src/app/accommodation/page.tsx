"use client";

import {
    FETCH_TRAVEL_PRODUCTS_OF_THE_BEST,
    FETCH_TRAVEL_PRODUCTS,
} from "@/commons/apis/queries/queries";
import { AccommodationListPage } from "@/components/accommodation-list/list";
import { BannerPage } from "@/components/boards-list/banner";
import { useQuery } from "@apollo/client";

const Page = () => {
    const { data, refetch, fetchMore } = useQuery(FETCH_TRAVEL_PRODUCTS, {
        variables: {
            isSoldout: false,
        },
    });

    const { data: bestProducts } = useQuery(FETCH_TRAVEL_PRODUCTS_OF_THE_BEST);

    return (
        <>
            <BannerPage />
            <AccommodationListPage
                data={data}
                bestProducts={bestProducts}
                refetch={refetch}
                fetchMore={fetchMore}
            />
        </>
    );
};

export default Page;

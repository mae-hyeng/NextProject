"use client";

import { LoginCheck } from "@/commons/hocs/loginCheck";
import AccommodationDetail from "@/components/accommodation-detail";
import { FETCH_TRAVEL_PRODUCT } from "@/components/accommodation-detail/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

const AccommodationDetailPage = () => {
    const params = useParams();

    const { data } = useQuery(FETCH_TRAVEL_PRODUCT, {
        variables: { travelproductId: params.travelproductId },
    });
    return (
        <>
            <AccommodationDetail data={data} />
        </>
    );
};

export default LoginCheck(AccommodationDetailPage);

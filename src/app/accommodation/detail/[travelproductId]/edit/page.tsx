"use client";

import { LoginCheck } from "@/commons/hocs/loginCheck";
import { FETCH_TRAVEL_PRODUCT } from "@/components/accommodation-detail/queries";
import { AccommodationWrite } from "@/components/accommodation-write";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

const AccommodationEdit = () => {
    const params = useParams();

    const { data } = useQuery(FETCH_TRAVEL_PRODUCT, {
        variables: { travelproductId: params.travelproductId },
    });
    return <AccommodationWrite isEdit={true} data={data} />;
};

export default LoginCheck(AccommodationEdit);

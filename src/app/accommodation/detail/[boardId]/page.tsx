"use client";

import { LoginCheck } from "@/commons/hocs/loginCheck";
import AccommodationDetail from "@/components/accommodation-detail";

const AccommodationDetailPage = () => {
    return (
        <>
            <AccommodationDetail />
        </>
    );
};

export default LoginCheck(AccommodationDetailPage);

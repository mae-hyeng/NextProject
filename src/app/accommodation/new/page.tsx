"use client";

import { LoginCheck } from "@/commons/hocs/loginCheck";
import { AccommodationWrite } from "@/components/accommodation-write";

const BoardsNew = () => {
    return <AccommodationWrite isEdit={false} />;
};

export default LoginCheck(BoardsNew);

import { FetchTravelproductQuery, UpdateBoardInput } from "@/commons/graphql/graphql";

export interface IAccommodationWriteProps {
    isEdit: boolean;
    data?: FetchTravelproductQuery;
}

export interface IUseAccommodationWriteProps {
    data: FetchTravelproductQuery;
    reset: any;
    setValue: any;
}

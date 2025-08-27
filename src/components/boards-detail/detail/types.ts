import { FetchBoardQuery } from "@/commons/graphql/graphql";

export interface IBoardDetailProps {
    data: FetchBoardQuery;
}

export interface IUseBoardDetailProps extends IBoardDetailProps {}

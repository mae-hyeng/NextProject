import { FetchBoardCommentsQuery, FetchBoardQuery } from "@/commons/graphql/graphql";

export interface ICommentListProps {
    data: FetchBoardQuery;
    comments: FetchBoardCommentsQuery;
}

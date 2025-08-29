import { BoardComment, FetchBoardQuery } from "@/commons/graphql/graphql";

export interface ICommentListItemProps {
    data: FetchBoardQuery;
    comment: BoardComment;
}

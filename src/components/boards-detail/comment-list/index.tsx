"use client";

import styles from "./styles.module.css";
import { CommentListItem } from "../comment-list-item";
import { ICommentListProps } from "./types";

export const CommentList = ({ data, comments }: ICommentListProps) => {
    return (
        <div className={styles.detail_all_comment}>
            <div
                className={styles.detail_all_comment_empty}
                style={comments ? { display: "none" } : { display: "block" }}
            >
                등록된 댓글이 없습니다.
            </div>
            {/* <InfiniteScroll next={} hasMore={} loader={} dataLength={}> */}
            {comments?.fetchBoardComments.map((comment) => (
                <CommentListItem key={comment._id} data={data} comment={comment} />
            ))}
            {/* </InfiniteScroll> */}
        </div>
    );
};

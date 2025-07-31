"use client";

import styles from "./styles.module.css";
import { CommentListItem } from "../comment-list-item";

export const CommentList = ({ commentsData }) => {
    return (
        <div className={styles.detail_all_comment}>
            <div
                className={styles.detail_all_comment_empty}
                style={commentsData.data ? { display: "none" } : { display: "block" }}
            >
                등록된 댓글이 없습니다.
            </div>
            {/* <InfiniteScroll next={} hasMore={} loader={} dataLength={}> */}
            {commentsData.data?.fetchBoardComments.map((comment) => (
                <CommentListItem key={comment._id} comment={comment} />
            ))}
            {/* </InfiniteScroll> */}
        </div>
    );
};

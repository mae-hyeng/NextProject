"use client";

import { QuestionListItem } from "../question-list-item/item";
import styles from "./styles.module.css";
import { IQuestionListProps } from "./types";

export const QuestionList = ({ data, questionData }: IQuestionListProps) => {
    return (
        <div className={styles.detail_all_question}>
            <div
                className={styles.detail_all_question_empty}
                style={questionData ? { display: "none" } : { display: "block" }}
            >
                등록된 댓글이 없습니다.
            </div>
            {/* <InfiniteScroll next={} hasMore={} loader={} dataLength={}> */}
            {questionData?.fetchTravelproductQuestions.map((question) => (
                <QuestionListItem key={question._id} data={data} question={question} />
            ))}
            {/* </InfiniteScroll> */}
        </div>
    );
};

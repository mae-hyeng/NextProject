"use client";

import { ReplyListItem } from "../item";
import styles from "./styles.module.css";

export const ReplyList = ({ data, questionData, refetchQuestionData }) => {
    const questions = questionData;

    return (
        <div className={styles.detail_all_reply}>
            <div
                className={styles.detail_all_reply_empty}
                style={questions ? { display: "none" } : { display: "block" }}
            >
                등록된 댓글이 없습니다.
            </div>
            {questions?.fetchTravelproductQuestions.map((question) => (
                <ReplyListItem
                    key={question._id}
                    data={data}
                    question={question}
                    refetchQuestionData={refetchQuestionData}
                />
            ))}
        </div>
    );
};

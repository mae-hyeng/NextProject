"use client";

import { ModalUI } from "@/commons/ui/modal";
import styles from "./styles.module.css";
import { Modal } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { useParams, useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { DELETE_TRAVEL_PRODUCT_QUESTION_ANSWER } from "@/commons/apis/mutations/mutations";

const AccommodationDetailQuestionAnswerDelete = () => {
    const router = useRouter();
    const params = useParams();

    const [deleteTravelProductQuestionAnswer] = useMutation(DELETE_TRAVEL_PRODUCT_QUESTION_ANSWER);

    const handleCloseModal = () => router.back();

    const onClickReplyDelete = async () => {
        try {
            await deleteTravelProductQuestionAnswer({
                variables: { travelproductQuestionAnswerId: params.travelproductQuestionAnswerId },
                update(cache, { data }) {
                    cache.modify({
                        fields: {
                            fetchTravelproductQuestionAnswers: (prev, { readField }) => {
                                const deletedId = data.deleteTravelproductQuestionAnswer;
                                const filteredAnswers = prev.filter(
                                    (answers) => readField("_id", answers) !== deletedId
                                );
                                return [...filteredAnswers];
                            },
                        },
                    });
                },
            });

            Modal.success({
                content: "문의글 답변을 삭제했습니다",
                onOk: () => router.back(),
            });
        } catch (error) {
            Modal.error({
                content: "답변 삭제 권한이 존재하지 않습니다.",
                onOk: () => router.back(),
            });
        }
    };

    return (
        <ModalUI open={true} onClose={handleCloseModal}>
            <div className={styles.modal_title}>작성하신 답변을 정말 삭제하시겠습니까?</div>
            <div className={styles.modal_button_wrapper}>
                <button className={styles.modal_button_cancel} onClick={handleCloseModal}>
                    취소하기
                </button>
                <button className={styles.modal_button_submit} onClick={onClickReplyDelete}>
                    삭제하기
                </button>
            </div>
        </ModalUI>
    );
};

export default AccommodationDetailQuestionAnswerDelete;

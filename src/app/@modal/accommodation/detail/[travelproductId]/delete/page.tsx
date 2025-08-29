"use client";

import { ModalUI } from "@/commons/ui/modal";
import styles from "./styles.module.css";
import { useMutation } from "@apollo/client";
import { DELETE_TRAVEL_PRODUCT } from "@/commons/apis/mutations/mutations";
import { useParams, useRouter } from "next/navigation";
import { Modal } from "antd";
import "@ant-design/v5-patch-for-react-19";

const AccommodationDetailDeleteModal = () => {
    const params = useParams();
    const router = useRouter();

    const [deleteTravelProduct] = useMutation(DELETE_TRAVEL_PRODUCT);

    const closeDeleteModal = () => router.back();

    const onClickDeleteAccommodation = async () => {
        try {
            await deleteTravelProduct({
                variables: { travelproductId: params.travelproductId },
                update(cache, { data }) {
                    cache.modify({
                        fields: {
                            fetchTravelproducts: (prev, { readField }) => {
                                const deletedId = data.deleteTravelproduct;
                                const filteredAccommodation = prev.filter(
                                    (accommodation) => readField("_id", accommodation) !== deletedId
                                );
                                return [...filteredAccommodation];
                            },
                        },
                    });
                },
            });
            router.push("/accommodation");
        } catch (error) {
            Modal.error({
                content: "상품 삭제 권한이 존재하지 않습니다..",
                onOk: () => {
                    closeDeleteModal();
                },
            });
        }
    };

    return (
        <ModalUI open={true} onClose={closeDeleteModal}>
            <div className={styles.modal_title}>정말 삭제하시겠습니까?</div>
            <div className={styles.modal_button_wrapper}>
                <button className={styles.modal_button_cancel} onClick={closeDeleteModal}>
                    취소하기
                </button>
                <button className={styles.modal_button_submit} onClick={onClickDeleteAccommodation}>
                    삭제하기
                </button>
            </div>
        </ModalUI>
    );
};

export default AccommodationDetailDeleteModal;

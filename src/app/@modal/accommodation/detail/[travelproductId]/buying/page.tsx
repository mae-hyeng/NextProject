"use client";

import { ModalUI } from "@/commons/ui/modal";
import styles from "./styles.module.css";
import { useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { Modal } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { FETCH_USER_LOGGED_IN } from "@/commons/apis/queries/queries";
import { CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING } from "@/commons/apis/mutations/mutations";

const AccommodationDetailBuyingModal = () => {
    const params = useParams();
    const router = useRouter();

    const [createPointTransactionOfBuyingAndSelling] = useMutation(
        CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING
    );

    const closeBoughtModal = () => {
        router.back();
    };

    const onClickBuyingAndSelling = async () => {
        try {
            const result = await createPointTransactionOfBuyingAndSelling({
                variables: { useritemId: params.travelproductId },
                refetchQueries: [{ query: FETCH_USER_LOGGED_IN }],
            });
            console.log(result);
            Modal.success({
                content: "상품 구매에 성공했습니다.",
                onOk: () => closeBoughtModal(),
            });
        } catch (error) {
            Modal.error({
                content: `${error.message}`,
                onOk: () => closeBoughtModal(),
            });
        }
    };
    return (
        <ModalUI open={true} onClose={closeBoughtModal}>
            <div className={styles.modal_bought_title}>해당 숙박권을 구매하시겠습니까?</div>
            <div className={styles.modal_bought_contents}>
                해당 숙박권은 포인트로만 구매 가능합니다.
            </div>
            <div className={styles.modal_button_wrapper}>
                <button className={styles.modal_button_cancel} onClick={closeBoughtModal}>
                    취소하기
                </button>
                <button className={styles.modal_button_submit} onClick={onClickBuyingAndSelling}>
                    구매하기
                </button>
            </div>
        </ModalUI>
    );
};

export default AccommodationDetailBuyingModal;

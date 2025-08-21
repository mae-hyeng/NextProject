"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { useAccommodationDetail } from "./hook";
import AccommodationDetailImageGallery from "./image-gallery";
import { ModalUI } from "@/commons/ui/modal";

const AccommodationDetail = ({ data, refetch }) => {
    const {
        isDeleteModalOpen,
        isBoughtModalOpen,
        openDeleteModal,
        closeDeleteModal,
        openBoughtModal,
        closeBoughtModal,
        onClickDeleteAccommodation,
        onClickBookmark,
        onClickBuyingAndSelling,
    } = useAccommodationDetail({ data, refetch });

    return (
        <div className={styles.accommodationDetail}>
            <div className={styles.detail_header_wrapper}>
                <h2>{data?.fetchTravelproduct?.name}</h2>
                <div className={styles.icons_wrapper}>
                    <Image
                        onClick={openDeleteModal}
                        src={"/images/delete-black.png"}
                        alt="delete"
                        width={25}
                        height={25}
                    />
                    <Image src={"/images/link.png"} alt="link" width={25} height={25} />
                    <Image src={"/images/location.png"} alt="location" width={25} height={25} />
                    <button
                        onClick={() => onClickBookmark(data?.fetchTravelproduct?._id)}
                        className={styles.accommodation_pickedCount}
                    >
                        {data?.fetchTravelproduct?.pickedCount}
                    </button>
                </div>
            </div>
            <div className={styles.accommodation_remarks}>{data?.fetchTravelproduct?.remarks}</div>
            <div className={styles.accommodation_tags}>
                {data?.fetchTravelproduct?.tags.map((tag, idx) => (
                    <div key={idx + 1}>#{tag.replace(/[#\s]/g, "")}</div>
                ))}
            </div>

            <div className={styles.accommodation_info_wrapper}>
                <div className={styles.info_wrapper_left}>
                    <AccommodationDetailImageGallery data={data} />
                </div>
                <div className={styles.info_wrapper_right}>
                    <div className={styles.info_wrapper}>
                        <h5>{data?.fetchTravelproduct?.price.toLocaleString("ko-KR")}</h5>
                        <ul>
                            <li>숙박권은 트립트립에서 포인트 충전 후 구매하실 수 있습니다.</li>
                            <li>상세 설명에 숙박권 사용기한을 꼭 확인해 주세요.</li>
                        </ul>
                        <button onClick={openBoughtModal}>구매하기</button>
                    </div>
                    <div className={styles.seller_wrapper}>
                        <h5>판매자</h5>
                        <div className={styles.user_info}>
                            <Image
                                src="/images/profile2.png"
                                alt="프로필"
                                width={25}
                                height={0}
                                sizes="100vw"
                            />
                            {data?.fetchTravelproduct?.seller.name}
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.divideLine}></div>

            <div className={styles.detail_contents_wrapper}>
                <h5>상세 설명</h5>
                <div
                    dangerouslySetInnerHTML={{
                        __html: data?.fetchTravelproduct.contents,
                    }}
                ></div>
            </div>

            <div className={styles.divideLine}></div>

            <div className={styles.detail_location_wrapper}>
                <h5>상세 위치</h5>
                <div id="geo" className={styles.geo}>
                    판매자가 주소를 입력하지 않았습니다 😅
                </div>
            </div>

            <div className={styles.detail_question_wrapper}>
                <div className={styles.question_img_wrapper}>
                    <Image
                        src="/images/chat.png"
                        alt="문의하기이미지"
                        width={25}
                        height={0}
                        sizes="100vw"
                    />
                    문의하기
                </div>
            </div>
            <ModalUI open={isDeleteModalOpen} onClose={closeDeleteModal}>
                <div className={styles.modal_title}>정말 삭제하시겠습니까?</div>
                <div className={styles.modal_button_wrapper}>
                    <button className={styles.modal_button_cancel} onClick={closeDeleteModal}>
                        취소하기
                    </button>
                    <button
                        className={styles.modal_button_submit}
                        onClick={onClickDeleteAccommodation}
                    >
                        삭제하기
                    </button>
                </div>
            </ModalUI>
            <ModalUI open={isBoughtModalOpen} onClose={closeBoughtModal}>
                <div className={styles.modal_bought_title}>해당 숙박권을 구매하시겠습니까?</div>
                <div className={styles.modal_bought_contents}>
                    해당 숙박권은 포인트로만 구매 가능합니다.
                </div>
                <div className={styles.modal_button_wrapper}>
                    <button className={styles.modal_button_cancel} onClick={closeBoughtModal}>
                        취소하기
                    </button>
                    <button
                        className={styles.modal_button_submit}
                        onClick={onClickBuyingAndSelling}
                    >
                        구매하기
                    </button>
                </div>
            </ModalUI>
        </div>
    );
};

export default AccommodationDetail;

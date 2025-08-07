"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { useAccommodationDetail } from "./hook";
import ImageGallery from "./image-gallery";
import AccommodationDetailImageGallery from "./image-gallery";
import Dompurify from "dompurify";

const AccommodationDetail = ({ data, refetch }) => {
    const { onClickBookmark, onClickBuyingAndSelling } = useAccommodationDetail({ data, refetch });

    return (
        <div className={styles.accommodationDetail}>
            <div className={styles.detail_header_wrapper}>
                <h2>{data?.fetchTravelproduct?.name}</h2>
                <div className={styles.icons_wrapper}>
                    <Image src={"/images/delete-black.png"} alt="delete" width={25} height={25} />
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
                    <div key={idx + 1}>#{tag}</div>
                ))}
            </div>

            <div className={styles.accommodation_info_wrapper}>
                <div className={styles.info_wrapper_left}>
                    {/* <Image src={"/images/inner1.png"} alt="실내이미지" width={640} height={300} /> */}
                    <AccommodationDetailImageGallery data={data} />
                </div>
                <div className={styles.info_wrapper_right}>
                    <div className={styles.info_wrapper}>
                        <h5>{data?.fetchTravelproduct?.price}</h5>
                        <ul>
                            <li>숙박권은 트립트립에서 포인트 충전 후 구매하실 수 있습니다.</li>
                            <li>상세 설명에 숙박권 사용기한을 꼭 확인해 주세요.</li>
                        </ul>
                        <button onClick={onClickBuyingAndSelling}>구매하기</button>
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
                    // dangerouslySetInnerHTML={{
                    //     __html: Dompurify.sanitize(data?.fetchTravelproduct.contents),
                    // }}
                ></div>
            </div>

            <div className={styles.divideLine}></div>

            <div className={styles.detail_location_wrapper}>
                <h5>상세 위치</h5>
                <div id="geo" className={styles.geo}>
                    지도 표시 영역
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
        </div>
    );
};

export default AccommodationDetail;

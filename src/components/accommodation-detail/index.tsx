"use client";

import Image from "next/image";
import styles from "./styles.module.css";

const AccommodationDetail = () => {
    return (
        <div className={styles.accommodationDetail}>
            <div className={styles.detail_header_wrapper}>
                <h2>포항 : 숙박권 명이 여기에 들어갑니다</h2>
                <div className={styles.icons_wrapper}>
                    <Image src={"/images/delete-black.png"} alt="delete" width={25} height={15} />
                    <Image src={"/images/link.png"} alt="link" width={25} height={0} />
                    <Image src={"/images/location.png"} alt="location" width={25} height={0} />
                    <Image src={"/images/bookmark.png"} alt="bookmark" width={25} height={0} />
                </div>
            </div>
            <div className={styles.accommodation_remarks}>모던한 분위기의 감도높은 숙소</div>
            <div className={styles.accommodation_tags}>
                <div>#6인 이하</div>
                <div>#건식 사우나</div>
                <div>#애견동반 가능</div>
            </div>

            <div className={styles.accommodation_info_wrapper}>
                <div className={styles.info_wrapper_left}>
                    <Image src={"/images/inner1.png"} alt="실내이미지" width={640} height={300} />
                </div>
                <div className={styles.info_wrapper_right}>
                    <div className={styles.info_wrapper}>
                        <h5>32,500원</h5>
                        <ul>
                            <li>숙박권은 트립트립에서 포인트 충전 후 구매하실 수 있습니다.</li>
                            <li>상세 설명에 숙박권 사용기한을 꼭 확인해 주세요.</li>
                        </ul>
                        <button>구매하기</button>
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
                            김상훈
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.divideLine}></div>

            <div className={styles.detail_contents_wrapper}>
                <h5>상세 설명</h5>
                <div>
                    살어리 살어리랏다 쳥산(靑山)애 살어리랏다 멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애
                    살어리랏다 얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라 새여 자고 니러 우러라 새여
                    널라와 시름 한 나도 자고 니러 우니로라 리얄리 얄라셩 얄라리 얄라 가던 새 가던 새
                    본다 믈 아래 가던 새 본다 잉무든 장글란 가지고 믈 아래 가던 새 본다 얄리얄리
                    얄라셩 얄라리 얄라 이링공 뎌링공 ᄒᆞ야 나즈란 디내와손뎌 오리도 가리도 업슨
                    바므란 ᄯᅩ 엇디 호리라 얄리얄리 얄라셩 얄라리 얄라 어듸라 더디던 돌코 누리라
                    마치던 돌코 믜리도 괴리도 업시 마자셔 우니노라 얄리얄리 얄라셩 얄라리 얄라
                    살어리 살어리랏다 바ᄅᆞ래 살어리랏다 ᄂᆞᄆᆞ자기 구조개랑 먹고 바ᄅᆞ래 살어리랏다
                    얄리얄리 얄라셩 얄라리 얄라 가다가 가다가 드로라 에졍지 가다가 드로라 사ᄉᆞ미
                    지ᇝ대예 올아셔 ᄒᆡ금(奚琴)을 혀거를 드로라 얄리얄리 얄라셩 얄라리 얄라 가다니
                    ᄇᆡ브른 도긔 설진 강수를 비조라 조롱곳 누로기 ᄆᆡ와 잡ᄉᆞ와니 내 엇디 ᄒᆞ리잇고
                    얄리얄리 얄라셩 얄라리 얄라
                </div>
            </div>

            <div className={styles.divideLine}></div>

            <div className={styles.detail_location_wrapper}>
                <h5>상세 위치</h5>
                <div>지도 표시 영역</div>
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
                <div>
                    <textarea
                        // onChange={onChangeInput}
                        name=""
                        placeholder="문의사항을 입력해 주세요."
                        // value={contents}
                    ></textarea>
                </div>
                <div className={styles.detail_question_btn_wrapper}>
                    <button>문의하기</button>
                </div>
            </div>
        </div>
    );
};

export default AccommodationDetail;

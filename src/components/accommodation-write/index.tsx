"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { Modal } from "antd";
import { DaumPostcodeEmbed } from "react-daum-postcode";
import { useAccommodationWrite } from "./hook";

export const AccommodationWrite = ({ isEdit }) => {
    const {
        isOpen,
        zipcode,
        address,
        addressDetail,
        imageRefs,
        imageUrls,
        onChangeInput,
        onClickUpdate,
        onClickSubmit,
        showModal,
        handleOk,
        handleCancel,
        handleComplete,
        onClickImage,
        onChangeImage,
        onDeleteImage,
    } = useAccommodationWrite();

    return (
        <div className={styles.accommodation_new}>
            <div className={styles.main}>
                <h5>숙박권 판매하기</h5>
                <div className={styles.main_section_1}>
                    <div>
                        상품명
                        <span className={styles.require_input}>*</span>
                    </div>
                    <input
                        onChange={onChangeInput}
                        name="name"
                        placeholder="상품명을 입력해 주세요."
                        // defaultValue={data?.fetchBoard.writer}
                        disabled={isEdit ? true : false}
                    />
                    <div id="name-error" className={styles.error}></div>
                </div>
                <div className={styles.divideLine}></div>

                <div className={styles.main_section_2}>
                    <div>
                        한줄 요약<span className={styles.require_input}>*</span>
                    </div>
                    <input
                        onChange={onChangeInput}
                        name="remarks"
                        placeholder="상품을 한줄로 요약해 주세요."
                        disabled={isEdit ? true : false}
                    />
                    <div id="remarks-error" className={styles.error}></div>
                </div>
                <div className={styles.divideLine}></div>

                <div className={styles.main_section_3}>
                    <div>
                        상품 설명<span className={styles.require_input}>*</span>
                    </div>
                    <textarea
                        onChange={onChangeInput}
                        name="contents"
                        // defaultValue={data?.fetchBoard.contents}
                    ></textarea>
                    <div id="content-error" className={styles.error}></div>
                </div>
                <div className={styles.divideLine}></div>

                <div className={styles.main_section_4}>
                    <div>
                        판매 가격<span className={styles.require_input}>*</span>
                    </div>
                    <input
                        onChange={onChangeInput}
                        name="price"
                        placeholder="판매 가격을 입력해 주세요. (원 단위)"
                        disabled={isEdit ? true : false}
                    />
                    <div id="price-error" className={styles.error}></div>
                </div>
                <div className={styles.divideLine}></div>

                <div className={styles.main_section_5}>
                    <div>태그 입력</div>
                    <input
                        onChange={onChangeInput}
                        name="tags"
                        placeholder="태그를 입력해 주세요."
                        disabled={isEdit ? true : false}
                    />
                </div>
                <div className={styles.divideLine}></div>

                <div className={styles.main_section_6}>
                    <div className={styles.address_wrapper}>
                        <div className={styles.address_left}>
                            <div>
                                주소<span className={styles.require_input}>*</span>
                            </div>
                            <div className={styles.address_area_1}>
                                <input placeholder="01234" value={zipcode} readOnly />
                                <button onClick={showModal}>우편번호 검색</button>
                            </div>
                            <div>
                                <input
                                    placeholder="주소를 입력해 주세요."
                                    value={address}
                                    readOnly
                                />
                            </div>
                            <div>
                                <input
                                    placeholder="상세주소"
                                    onChange={onChangeInput}
                                    name="addressDetail"
                                    value={addressDetail}
                                />
                            </div>
                            <div className={styles.LatLng_area}>
                                <div>위도(LAT)</div>
                                <input placeholder="주소를 먼저 입력해 주세요." />
                            </div>
                            <div className={styles.LatLng_area}>
                                <div>경도(LNG)</div>
                                <input placeholder="주소를 먼저 입력해 주세요." />
                            </div>
                        </div>
                        <div className={styles.address_right}>
                            <div>상세 위치</div>
                            <div className={styles.geo}>주소를 먼저 입력해 주세요.</div>
                        </div>
                    </div>
                </div>

                {isOpen && (
                    <Modal open={true} onOk={handleOk} onCancel={handleCancel}>
                        <DaumPostcodeEmbed onComplete={handleComplete} />
                    </Modal>
                )}

                <div className={styles.main_section_7}>
                    <div>사진 첨부</div>
                    <div className={styles.img_wrapper}>
                        {Array(3)
                            .fill(0)
                            .map((_, idx) => (
                                <div key={idx} className={styles.img_position}>
                                    <Image
                                        src={
                                            // imageUrls[idx]
                                            //     ? imageUrls[idx].startsWith("codecamp")
                                            //         ? `https://storage.googleapis.com/${imageUrls[idx]}`
                                            //         : `/images/addImage.png`
                                            //     : data?.fetchBoard.images?.[idx]
                                            //     ? `https://storage.googleapis.com/${data.fetchBoard.images[idx]}`
                                            //     : `/images/addImage.png`
                                            imageUrls[idx]
                                                ? `https://storage.googleapis.com/${imageUrls[idx]}`
                                                : `/images/addImage.png`
                                        }
                                        alt={`이미지추가버튼${idx + 1}`}
                                        width={300}
                                        height={300}
                                        onClick={() => onClickImage(idx)}
                                    />
                                    <input
                                        type="file"
                                        className={styles.image_input}
                                        onChange={(e) => onChangeImage(e, idx)}
                                        ref={(el) => {
                                            imageRefs.current[idx] = el;
                                        }}
                                    />
                                    <button
                                        onClick={() => onDeleteImage(idx)}
                                        className={styles.image_delete}
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        {/* <BoardWriteImage /> */}
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <button className={styles.cancel}>취소</button>
                <button onClick={isEdit ? onClickUpdate : onClickSubmit} className={styles.submit}>
                    {isEdit ? "수정" : "등록"}하기
                </button>
            </div>
        </div>
    );
};

"use client";

import styles from "./styles.module.css";
import { AccommodationList } from "./hook";
import { AccommodationSearchPage } from "../search";
import Image from "next/image";
import { ImageSwiper } from "../swiper";
import InfiniteScroll from "react-infinite-scroll-component";
import { FixedSizeList as List } from "react-window";

export const AccommodationListPage = ({ data, bestProducts, refetch, fetchMore }) => {
    const {
        category,
        hasMore,
        onClickCategory,
        onClickAccommodation,
        onClickRegister,
        onChangeKeyword,
        onChangeDatePicker,
        onNext,
    } = AccommodationList({ refetch, data, fetchMore });
    return (
        <>
            <div className={styles.accommodation_page}>
                {/* <h1>2024 끝여름 낭만있게 마무리 하고 싶다면?</h1> */}
                <h1>{new Date().getFullYear()}년 가장 인기 있는 상품 TOP 4!</h1>
                <ImageSwiper bestProducts={bestProducts} />
                <h1>여기에서만 예약할 수 있는 숙소</h1>
                <div className={styles.button_wrapper}>
                    <button
                        className={
                            category === "reservationAvailable" ? styles.reservation_selected : ""
                        }
                        onClick={() => onClickCategory("reservationAvailable")}
                    >
                        예약 가능 숙소
                    </button>
                    <button
                        className={
                            category === "reservationClosed" ? styles.reservation_selected : ""
                        }
                        onClick={() => onClickCategory("reservationClosed")}
                    >
                        예약 마감 숙소
                    </button>
                </div>
                <div className={styles.accommodation_boards}>
                    <div className={styles.accommodation_func_wrapper}>
                        <AccommodationSearchPage
                            onChangeKeyword={onChangeKeyword}
                            onChangeDatePicker={onChangeDatePicker}
                        />
                        <div>
                            <button onClick={onClickRegister} className={styles.submit_btn}>
                                숙박권 판매하기
                            </button>
                        </div>
                    </div>
                    <div className={styles.accommodation_wrapper}>
                        <InfiniteScroll
                            next={onNext}
                            hasMore={hasMore}
                            loader={<div></div>}
                            dataLength={data?.fetchTravelproducts.length ?? 0}
                        >
                            <div className={styles.accommodation_table}>
                                {data?.fetchTravelproducts?.map((product) => (
                                    <div
                                        key={product._id}
                                        onClick={() => onClickAccommodation(product._id)}
                                        className={styles.product_wrapper}
                                    >
                                        <Image
                                            src={
                                                product.images.filter(Boolean).length
                                                    ? `https://storage.googleapis.com/${product.images[0]}`
                                                    : "/images/accommodation-detail.png"
                                            }
                                            alt="이미지"
                                            className={styles.product_image}
                                            width={350}
                                            height={350}
                                        />
                                        <div className={styles.product_name}>{product.name}</div>
                                        <div className={styles.product_remarks}>
                                            {product?.remarks}
                                        </div>
                                        <div className={styles.product_tags}>
                                            {product.tags
                                                .map((tag) => tag.replace(/[#\s]/g, ""))
                                                .filter((tag) => tag !== "").length ? (
                                                product.tags
                                                    .map((tag) => tag.replace(/[#\s]/g, ""))
                                                    .filter((tag) => tag !== "")
                                                    .map((tag) => `#${tag} `)
                                            ) : (
                                                <div className={styles.product_tags_none}>#</div>
                                            )}
                                        </div>
                                        <div className={styles.product_seller_price}>
                                            <div>아이콘/{product?.seller?.name}</div>
                                            <div className={styles.product_price}>
                                                {product?.price.toLocaleString("ko-KR")}
                                            </div>
                                        </div>
                                        <div className={styles.accommodation_pickedCount}>
                                            {product?.pickedCount}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        </>
    );
};

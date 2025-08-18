"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export const Banner = () => {
    return (
        <>
            <Swiper
                spaceBetween={0}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <Image
                        src="/images/banner.png"
                        alt="이미지"
                        className={styles.banner_img}
                        width={1000}
                        height={700}
                        sizes="100vw"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        src="/images/banner2.png"
                        alt="이미지"
                        className={styles.banner_img}
                        width={1000}
                        height={700}
                        sizes="100vw"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        src="/images/banner3.png"
                        alt="이미지"
                        className={styles.banner_img}
                        width={1000}
                        height={700}
                        sizes="100vw"
                    />
                </SwiperSlide>
            </Swiper>
        </>
    );
};

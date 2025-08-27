import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import styles from "./styles.module.css";
import Image from "next/image";
import { useImageSwiper } from "./hook";
import { useRef } from "react";

export const ImageSwiper = ({ bestProducts }) => {
    const { onClickBestProduct } = useImageSwiper();
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <div className={styles.image_swiper_wrapper}>
            <Swiper
                navigation={{
                    nextEl: nextRef.current,
                    prevEl: prevRef.current,
                }}
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={2}
                loop={true}
                style={{ width: "100%" }}
            >
                {bestProducts?.fetchTravelproductsOfTheBest.map((product) => (
                    <SwiperSlide key={product._id}>
                        <div
                            className={styles.product_wrapper}
                            onClick={onClickBestProduct(product._id)}
                        >
                            <Image
                                src={`https://storage.googleapis.com/${product.images[0]}`}
                                alt="이미지"
                                className={styles.product_image}
                                width={700}
                                height={700}
                            />
                            <div className={styles.product_name}>{product.name}</div>
                            <div className={styles.product_remarks}>{product.remarks}</div>
                            <div className={styles.product_price}>
                                {product.price.toLocaleString("ko-KR")} 원
                            </div>
                            <div className={styles.accommodation_pickedCount}>
                                {product.pickedCount}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <button ref={prevRef} className={styles.prev_button}>
                {"<"}
            </button>
            <button ref={nextRef} className={styles.next_button}>
                {">"}
            </button>
        </div>
    );
};

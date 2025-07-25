"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { TransactionHistoryBookmark } from "./transaction-history-bookmark";
import { PointUsageHistory } from "./point-usage-history";
import { ChangePassword } from "./change-password";
import { useMyPages } from "./hook";

export const MyPage = () => {
    const { category, onClickCategory } = useMyPages();
    return (
        <div className={styles.myPage}>
            <h3>마이 페이지</h3>
            <div className={styles.my_info_wrapper}>
                <h4>내 정보</h4>
                <div className={styles.profile_area}>
                    <Image
                        src="/images/profile1.png"
                        alt="프로필이미지"
                        width={25}
                        height={0}
                        sizes="100vw"
                    />
                    <div>홍길동</div>
                </div>
                <div className={styles.divideLine}></div>
                <div className={styles.point_wrapper}>
                    <Image src="/images/point.png" alt="포인트이미지" width={25} height={25} />
                    <div>23,000P</div>
                </div>
                <div className={styles.divideLine}></div>

                <div
                    className={`${styles.menu_wrapper} ${
                        category === "transactionHistoryBookmark"
                            ? styles.menu_wrapper_selected
                            : ""
                    }`}
                    onClick={() => onClickCategory("transactionHistoryBookmark")}
                >
                    <div>거래내역&북마크</div>
                    <div>➡️</div>
                </div>
                <div
                    className={`${styles.menu_wrapper} ${
                        category === "pointUsageHistory" ? styles.menu_wrapper_selected : ""
                    }`}
                    onClick={() => onClickCategory("pointUsageHistory")}
                >
                    <div>포인트 사용 내역</div>
                    <div>➡️</div>
                </div>
                <div
                    className={`${styles.menu_wrapper} ${
                        category === "changePassword" ? styles.menu_wrapper_selected : ""
                    }`}
                    onClick={() => onClickCategory("changePassword")}
                >
                    <div>비밀번호 변경</div>
                    <div>➡️</div>
                </div>
            </div>

            {category === "transactionHistoryBookmark" && <TransactionHistoryBookmark />}
            {category === "pointUsageHistory" && <PointUsageHistory />}
            {category === "changePassword" && <ChangePassword />}
        </div>
    );
};

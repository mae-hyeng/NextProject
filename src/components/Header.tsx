import React from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import classNames from "classnames";

export default function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.left_header}>
                <Image src="/images/logo.png" alt="로고" width={50} height={0} />
                <div className={classNames(styles.header_category, styles.selected)}>트립토크</div>
                <div className={styles.header_category}>숙박권 구매</div>
                <div className={styles.header_category}>마이 페이지</div>
            </div>
            <div className={styles.right_header}>
                <Image src="/images/profile.png" alt="프로필" width={25} height={0} />
                <select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
            </div>
        </div>
    );
}

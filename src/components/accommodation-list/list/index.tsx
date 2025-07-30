"use client";

import styles from "./styles.module.css";
import { AccommodationList } from "./hook";
import { AccommodationSearchPage } from "../search";
// import { Pagination } from "../pagination";
// import { BoardSearchPage } from "../search";

export const AccommodationListPage = (
    {
        /* data, lastPage, refetch, boardsCountRefetch*/
    }
) => {
    const {
        keyword,
        // onClickBoard,
        // onClickDeleteBoard,
        onClickRegister,
        onChangeKeyword,
        onChangeDatePicker,
    } = AccommodationList();
    return (
        <>
            <div className={styles.accommodation_page}>
                <h1>2024 끝여름 낭만있게 마무리 하고 싶다면?</h1>
                <div className={styles.accommodation_wrapper}></div>
                <h1>여기에서만 예약할 수 있는 숙소</h1>
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
                        <div className={styles.accommodation_table}></div>
                    </div>
                </div>
            </div>
        </>
    );
};

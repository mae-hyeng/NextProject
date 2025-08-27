"use client";
import styles from "./styles.module.css";
import _ from "lodash";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { IAccommodationSearchProps } from "./types";

dayjs.extend(customParseFormat);

export const AccommodationSearchPage = ({ onChangeKeyword }: IAccommodationSearchProps) => {
    return (
        <>
            <div className={styles.boards_func}>
                <input
                    onChange={onChangeKeyword}
                    className={styles.text_input}
                    placeholder="제목을 검색해 주세요."
                    type="text"
                />
            </div>
        </>
    );
};

"use client";
import styles from "./styles.module.css";
import _ from "lodash";

import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const AccommodationSearchPage = ({ onChangeKeyword, onChangeDatePicker }) => {
    const { RangePicker } = DatePicker;

    const dateFormat = "YYYY/MM/DD";

    const today = new Date();
    today.setFullYear(today.getFullYear() - 1);

    return (
        <>
            <div className={styles.boards_func}>
                <RangePicker
                    defaultValue={[
                        dayjs(today.toLocaleDateString()),
                        dayjs(new Date().toLocaleDateString()),
                    ]}
                    format={dateFormat}
                    onChange={onChangeDatePicker}
                    allowClear={false}
                    className={styles.date_input}
                />
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

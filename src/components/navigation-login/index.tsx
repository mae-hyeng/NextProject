"use client";

import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import Image from "next/image";
import styles from "./styles.module.css";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { PointChargeModalUI } from "@/commons/ui/modal/point-charge";
import { useNavigationLogin } from "./hook";

export const NavigationLogin = ({ data }) => {
    const {
        open,
        anchorEl,
        isModalOpen,
        onChangePointCharge,
        onClickPointCharge,
        onClickLogOut,
        handleClick,
        handleClose,
        handleOpenModal,
        handleCloseModal,
    } = useNavigationLogin();

    return (
        <div>
            <Button
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                className={styles.menu_s_b}
            >
                <Image src="/images/profile.png" alt="프로필" width={25} height={25} />
                <CaretDownOutlined />
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                <MenuItem onClick={handleClose}>
                    <div className={`${styles.menu_wrapper} ${styles.menu_s_b}`}>
                        <div className={styles.user_wrapper}>
                            <Image
                                src={"/images/profile.png"}
                                alt="profile"
                                className={styles.menu_image_30}
                                width={30}
                                height={30}
                            />
                            {data?.fetchUserLoggedIn.name}
                        </div>
                        <CaretUpOutlined />
                    </div>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <div className={styles.menu_wrapper}>
                        <Image
                            src={"/images/point.png"}
                            alt="point"
                            className={styles.menu_image_20}
                            width={20}
                            height={0}
                        />
                        {data?.fetchUserLoggedIn.userPoint.amount.toLocaleString("ko-KR")}
                    </div>
                </MenuItem>
                <MenuItem onClick={handleOpenModal}>
                    <div className={styles.menu_wrapper}>
                        <Image
                            src={"/images/charge.png"}
                            alt="charge"
                            className={styles.menu_image_15}
                            width={15}
                            height={15}
                        />
                        포인트 충전
                    </div>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <div className={styles.menu_wrapper} onClick={onClickLogOut}>
                        <Image
                            src={"/images/logout.png"}
                            alt="logout"
                            className={styles.menu_image_15}
                            width={15}
                            height={15}
                        />
                        로그아웃
                    </div>
                </MenuItem>
            </Menu>
            <PointChargeModalUI open={isModalOpen} onClose={handleCloseModal}>
                <Image
                    src={"/images/point-charge.png"}
                    alt="포인트충전이미지"
                    className={styles.point_charge_image}
                    width={100}
                    height={100}
                    sizes="100vw"
                />
                <div className={styles.point_charge_title}>충전하실 금액을 선택해 주세요</div>
                <div>
                    <select
                        className={styles.point_charge_select}
                        onChange={onChangePointCharge}
                        defaultValue={""}
                    >
                        <option value="" disabled hidden>
                            내용입력
                        </option>
                        <option value="100">100</option>
                        <option value="500">500</option>
                        <option value="2000">2,000</option>
                        <option value="5000">5,000</option>
                        <option value="10000">10,000</option>
                        <option value="50000">50,000</option>
                    </select>
                </div>
                <div className={styles.point_charge_button_wrapper}>
                    <button className={styles.point_charge_cancel} onClick={handleCloseModal}>
                        취소
                    </button>
                    <button className={styles.point_charge_submit} onClick={onClickPointCharge}>
                        충전하기
                    </button>
                </div>
            </PointChargeModalUI>
        </div>
    );
};

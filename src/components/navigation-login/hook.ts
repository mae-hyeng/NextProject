import { useState } from "react";
import * as PortOne from "@portone/browser-sdk/v2";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@apollo/client";
import { CREATE_POINT_TRANSACTION_OF_LOADING } from "./queries";
import { LOG_OUT_USER } from "@/commons/hooks/queries";
import { Modal } from "antd";
import { useAccessTokenStore } from "@/commons/stores/accessTokenStore";
import { useLoadStore } from "@/commons/stores/loadStore";

export const useNavigationLogin = () => {
    const [point, setPoint] = useState();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const [createPointTransactionOfLoading] = useMutation(CREATE_POINT_TRANSACTION_OF_LOADING);

    const [logOutUser] = useMutation(LOG_OUT_USER);

    const { setAccessToken } = useAccessTokenStore();
    const { setIsLoaded } = useLoadStore();

    const onChangePointCharge = (e) => {
        setPoint(e.target.value);
    };
    const onClickPointCharge = async () => {
        const paymentResult = await PortOne.requestPayment({
            storeId: "store-abc39db7-8ee1-4898-919e-0af603a68317",
            channelKey: "channel-key-1dc10cea-ec89-471d-aedf-f4bd68993f33",
            paymentId: uuidv4(),
            orderName: `${point} 충전`,
            totalAmount: Number(point),
            currency: "CURRENCY_KRW",
            payMethod: "EASY_PAY",
            customer: {
                fullName: userInfo.name,
                email: userInfo.email,
            },
            redirectUrl: "http://localhost:3000/mypage",
        });

        await createPointTransactionOfLoading({
            variables: { paymentId: paymentResult.paymentId },
        });
        handleCloseModal();
    };

    const onClickLogOut = async () => {
        try {
            await logOutUser();
            setIsLoaded(false);
            setAccessToken("");
        } catch (error) {
            Modal.error({ content: `${error}` });
        }
    };

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
        handleClose();
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return {
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
    };
};

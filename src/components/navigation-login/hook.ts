import { useEffect, useState } from "react";
import * as PortOne from "@portone/browser-sdk/v2";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@apollo/client";
import { CREATE_POINT_TRANSACTION_OF_LOADING } from "./queries";
import { LOG_OUT_USER } from "@/commons/hooks/queries";
import { Modal } from "antd";
import { useAccessTokenStore } from "@/commons/stores/accessTokenStore";
import { useLoadStore } from "@/commons/stores/loadStore";
import { useAuthStore } from "@/commons/stores/authStore";
import { FETCH_USER_LOGGED_IN } from "../login/queries";

export const useNavigationLogin = () => {
    const [point, setPoint] = useState();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState(null);

    const { user: authUser } = useAuthStore();

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
    }, [authUser]);

    const [createPointTransactionOfLoading] = useMutation(CREATE_POINT_TRANSACTION_OF_LOADING);

    const [logOutUser] = useMutation(LOG_OUT_USER);

    const { setAccessToken } = useAccessTokenStore();
    const { setIsLoaded } = useLoadStore();

    const onChangePointCharge = (e) => {
        setPoint(e.target.value);
    };
    const onClickPointCharge = async () => {
        try {
            const paymentResult = await PortOne.requestPayment({
                storeId: "store-abc39db7-8ee1-4898-919e-0af603a68317",
                channelKey: "channel-key-1dc10cea-ec89-471d-aedf-f4bd68993f33",
                paymentId: uuidv4(),
                orderName: `${point} 충전`,
                totalAmount: Number(point),
                currency: "CURRENCY_KRW",
                payMethod: "EASY_PAY",
                customer: {
                    fullName: user.name,
                    email: user.email,
                },
                redirectUrl: "http://localhost:3000/mypage",
            });

            await createPointTransactionOfLoading({
                variables: { paymentId: paymentResult.paymentId },
                refetchQueries: [{ query: FETCH_USER_LOGGED_IN }],
            });

            Modal.success({
                content: "충전 완료! 상품을 구매해보세요!",
                onOk: () => handleCloseModal(),
            });
        } catch (error) {
            Modal.error({ content: "충전에 실패했습니다. 다시 시도해주세요." });
        }
    };

    const onClickLogOut = async () => {
        try {
            await logOutUser({ refetchQueries: [{ query: FETCH_USER_LOGGED_IN }] });
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

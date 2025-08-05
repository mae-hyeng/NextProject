import { useState } from "react";
import * as PortOne from "@portone/browser-sdk/v2";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@apollo/client";
import { CREATE_POINT_TRANSACTION_OF_LOADING } from "./queries";

export const useNavigationLogin = () => {
    const [point, setPoint] = useState();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const [createPointTransactionOfLoading] = useMutation(CREATE_POINT_TRANSACTION_OF_LOADING);

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
        console.log("paymentResult : ", paymentResult);

        const result = await createPointTransactionOfLoading({
            variables: { paymentId: paymentResult.paymentId },
        });

        console.log("result : ", result);
        handleCloseModal();
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
        handleClick,
        handleClose,
        handleOpenModal,
        handleCloseModal,
    };
};

import { useMutation } from "@apollo/client";
import {
    CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING,
    TOGGLE_TRAVEL_PRODUCT_PICK,
} from "./queries";
import { useParams } from "next/navigation";
import { useEffect } from "react";

declare const window: Window & {
    kakao: any;
};

export const useAccommodationDetail = ({ data, refetch }) => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "//dapi.kakao.com/v2/maps/sdk.js?appkey=ae65aedca7117fd8bfe6b82678329eca&libraries=services&autoload=false";
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(function () {
                const container = document.getElementById("geo");
                const options = {
                    center: new window.kakao.maps.LatLng(
                        data?.fetchTravelproduct.travelproductAddress.lat,
                        data?.fetchTravelproduct.travelproductAddress.lng
                    ),
                    level: 3,
                };
                new window.kakao.maps.Map(container, options);
            });
        };
    }, [data?.fetchTravelproduct?.travelproductAddress]);
    const params = useParams();

    const [toggleTravelProductPick] = useMutation(TOGGLE_TRAVEL_PRODUCT_PICK);
    const [createPointTransactionOfBuyingAndSelling] = useMutation(
        CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING
    );

    const onClickBookmark = async (id) => {
        try {
            const result = await toggleTravelProductPick({ variables: { travelproductId: id } });
            await refetch({ travelproductId: params.travelproductId });
            console.log("북마크 count : ", result);
        } catch (error) {
            console.log(error);
        }
    };

    const onClickBuyingAndSelling = async () => {
        // todoList : 모달창 띄워서 취소/구매 버튼으로 분기점 나누기
        try {
            const result = await createPointTransactionOfBuyingAndSelling({
                variables: { useritemId: data.fetchTravelproduct._id },
            });
            console.log("상품구매 result : ", result);
        } catch (error) {
            alert(error);
        }
    };

    return { onClickBookmark, onClickBuyingAndSelling };
};

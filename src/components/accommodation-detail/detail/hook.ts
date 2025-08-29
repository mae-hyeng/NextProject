import { TOGGLE_TRAVEL_PRODUCT_PICK } from "@/commons/apis/mutations/mutations";
import { useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Modal } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { IUseAccommodationDetailProps } from "./types";

declare const window: Window & {
    kakao: any;
};

export const useAccommodationDetail = ({ data, refetch }: IUseAccommodationDetailProps) => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "//dapi.kakao.com/v2/maps/sdk.js?appkey=ae65aedca7117fd8bfe6b82678329eca&libraries=services&autoload=false";
        document.head.appendChild(script);

        script.onload = () => {
            if (!data?.fetchTravelproduct.travelproductAddress) return;
            window.kakao.maps.load(function () {
                const container = document.getElementById("geo");
                const options = {
                    center: new window.kakao.maps.LatLng(
                        data?.fetchTravelproduct.travelproductAddress.lat || 0,
                        data?.fetchTravelproduct.travelproductAddress.lng || 0
                    ),
                    level: 3,
                };
                new window.kakao.maps.Map(container, options);
            });
        };
    }, [data?.fetchTravelproduct?.travelproductAddress]);
    const params = useParams();

    const [toggleTravelProductPick] = useMutation(TOGGLE_TRAVEL_PRODUCT_PICK);

    const onClickBookmark = async (id: string) => {
        try {
            await toggleTravelProductPick({ variables: { travelproductId: id } });
            await refetch({ travelproductId: params.travelproductId });
        } catch (error) {
            Modal.error({
                content: `${error}`,
            });
        }

        // 리팩토링 버전(좋아요 누른 사람들이 누군지 알아야지 +1, -1 할텐데 백엔드로직에 그 부분이 빠져있어 일단 주석처리)
        // try {
        //     await toggleTravelProductPick({
        //         variables: { travelproductId: id },
        //         optimisticResponse: {
        //             toggleTravelproductPick: (data?.fetchTravelproduct.pickedCount ?? 0) + 1,
        //         },
        //         update: (cache, { data: toggleTravelproductPickData }) => {
        //             console.log(
        //                 "cache : ",
        //                 cache,
        //                 "data : ",
        //                 data,
        //                 "toggle : ",
        //                 toggleTravelproductPickData
        //             );
        //             cache.writeQuery({
        //                 query: FETCH_TRAVEL_PRODUCT,
        //                 variables: { travelproductId: params.travelproductId },
        //                 data: {
        //                     fetchTravelproduct: {
        //                         _id: data?.fetchTravelproduct._id,
        //                         name: data?.fetchTravelproduct.name,
        //                         remarks: data?.fetchTravelproduct.remarks,
        //                         contents: data?.fetchTravelproduct.contents,
        //                         price: data?.fetchTravelproduct.price,
        //                         tags: data?.fetchTravelproduct.tags,
        //                         images: data?.fetchTravelproduct.images,
        //                         pickedCount: toggleTravelproductPickData.toggleTravelproductPick,
        //                         travelproductAddress: data?.fetchTravelproduct.travelproductAddress,
        //                         buyer: data?.fetchTravelproduct.buyer,
        //                         seller: data?.fetchTravelproduct.seller,
        //                         soldAt: data?.fetchTravelproduct.soldAt,
        //                         createdAt: data?.fetchTravelproduct.createdAt,
        //                         updatedAt: data?.fetchTravelproduct.updatedAt,
        //                         deletedAt: data?.fetchTravelproduct.deletedAt,
        //                         __typename: "Travelproduct",
        //                     },
        //                 },
        //             });
        //         },
        //     });
        // } catch (error) {
        //       Modal.error({
        //       content: `${error}`,
        //   });
        // }
    };

    return {
        onClickBookmark,
    };
};

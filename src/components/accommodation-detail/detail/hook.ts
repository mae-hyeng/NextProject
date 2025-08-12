import { useMutation } from "@apollo/client";
import {
    CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING,
    DELETE_TRAVEL_PRODUCT,
    TOGGLE_TRAVEL_PRODUCT_PICK,
} from "./queries";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
            if (!data?.fetchTravelproduct.travelproductAddress) return setIsAddress(false);
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
                setIsAddress(true);
            });
        };
    }, [data?.fetchTravelproduct?.travelproductAddress]);
    const params = useParams();

    const [toggleTravelProductPick] = useMutation(TOGGLE_TRAVEL_PRODUCT_PICK);
    const [createPointTransactionOfBuyingAndSelling] = useMutation(
        CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING
    );
    const [deleteTravelProduct] = useMutation(DELETE_TRAVEL_PRODUCT);

    const router = useRouter();

    const [isAddress, setIsAddress] = useState(true);

    const onClickBookmark = async (id) => {
        try {
            await toggleTravelProductPick({ variables: { travelproductId: id } });
            await refetch({ travelproductId: params.travelproductId });
        } catch (error) {
            alert(error);
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
        //     alert(error);
        // }
    };

    const onClickBuyingAndSelling = async () => {
        // todoList : 모달창 띄워서 취소/구매 버튼으로 분기점 나누기
        try {
            const result = await createPointTransactionOfBuyingAndSelling({
                variables: { useritemId: data.fetchTravelproduct._id },
            });
        } catch (error) {
            alert(error);
        }
    };

    const onClickDeleteAccommodation = () => {
        if (confirm("정말 삭제하시겠습니까?")) {
            try {
                deleteTravelProduct({
                    variables: { travelproductId: params.travelproductId },
                    update(cache, { data }) {
                        cache.modify({
                            fields: {
                                fetchTravelproducts: (prev, { readField }) => {
                                    const deletedId = data.deleteTravelproduct;
                                    const filteredAccommodation = prev.filter(
                                        (accommodation) =>
                                            readField("_id", accommodation) !== deletedId
                                    );
                                    return [...filteredAccommodation];
                                },
                            },
                        });
                    },
                });
                router.push("/accommodation");
            } catch (error) {
                console.log(error);
            }
        }
    };

    return { isAddress, onClickDeleteAccommodation, onClickBookmark, onClickBuyingAndSelling };
};

"use client";

import { useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { checkValidationFile } from "@/commons/libraries/validationFile";
import { UploadFileDocument } from "@/commons/graphql/graphql";
import { CREATE_TRAVEL_PRODUCT, UPDATE_TRAVEL_PRODUCT } from "./queries";

declare const window: Window & {
    kakao: any;
};

export const useAccommodationWrite = (data, reset, setValue) => {
    const kakaoMapRef = useRef();

    useEffect(() => {
        if (data?.fetchTravelproduct?.travelproductAddress) {
            reset({
                zipcode: data.fetchTravelproduct.travelproductAddress.zipcode ?? "",
                address: data.fetchTravelproduct.travelproductAddress.address ?? "",
                addressDetail: data.fetchTravelproduct.travelproductAddress.addressDetail ?? "",
                lat: data.fetchTravelproduct.travelproductAddress.lat ?? "",
                lng: data.fetchTravelproduct.travelproductAddress.lng ?? "",
            });
        }

        if (data?.fetchTravelproduct?.images) {
            setImageUrls(data.fetchTravelproduct.images);
        }
    }, [data]);

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
                kakaoMapRef.current = new window.kakao.maps.Map(container, options);
            });
        };
    }, [data?.fetchTravelproduct?.travelproductAddress]);

    const [createTravelProduct] = useMutation(CREATE_TRAVEL_PRODUCT);
    const [updateTravelProduct] = useMutation(UPDATE_TRAVEL_PRODUCT);

    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();
    const params = useParams();

    // imgs
    const imageRefs = useRef<(HTMLInputElement | null)[]>([]);

    const [imageUrls, setImageUrls] = useState(["", "", ""]);

    const [uploadFile] = useMutation(UploadFileDocument);

    const onClickSubmit = async (data) => {
        try {
            const result = await createTravelProduct({
                variables: {
                    name: data.name,
                    remarks: data.remarks,
                    contents: data.contents,
                    price: Number(data.price),
                    tags: data.tags.split(/[\s,]+/),
                    travelproductAddress: {
                        zipcode: data.zipcode,
                        address: data.address,
                        addressDetail: data.addressDetail,
                        lat: parseFloat(data.lat),
                        lng: parseFloat(data.lng),
                    },
                    images: imageUrls,
                },
            });

            router.push(`/accommodation/detail/${result.data.createTravelproduct._id}`);
        } catch (error) {
            console.log(error);
            alert("에러가 발생하였습니다. 다시 시도해 주세요.");
        }
    };

    const onClickUpdate = async (data) => {
        try {
            const variables = {
                updateTravelproductInput: {
                    name: data.name,
                    remarks: data.remarks,
                    contents: data.contents,
                    price: Number(data.price),
                    tags: data.tags.split(/[\s,]+/),
                    travelproductAddress: {
                        zipcode: data.zipcode,
                        address: data.address,
                        addressDetail: data.addressDetail,
                        lat: parseFloat(data.lat),
                        lng: parseFloat(data.lng),
                    },
                    images: imageUrls,
                },
                travelproductId: params.travelproductId,
            };
            const result = await updateTravelProduct({ variables });
            router.push(`/accommodation/detail/${result.data.updateTravelproduct._id}`);
        } catch (error) {
            console.log(error);
            // alert("비밀번호가 일치하지 않습니다!");
        }
    };

    const showModal = () => {
        setIsOpen(true);
    };

    const handleOk = () => {
        setIsOpen(false);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    const handleComplete = (data: {
        zonecode: SetStateAction<string>;
        address: SetStateAction<string>;
    }) => {
        setIsOpen(false);
        setValue("zipcode", data.zonecode);
        setValue("address", data.address);
        setValue("addressDetail", "");

        if (new window.kakao.maps.services.Geocoder()) {
            new window.kakao.maps.services.Geocoder().addressSearch(
                data.address,
                function (result, status) {
                    if (status === window.kakao.maps.services.Status.OK) {
                        const latLng = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                        kakaoMapRef.current.setCenter(latLng);
                        setValue("lat", result[0].y);
                        setValue("lng", result[0].x);
                    }
                }
            );
        }
    };

    const onClickImage = (idx: string | number) => {
        imageRefs.current[idx]?.click();
    };

    const onChangeImage = async (e: ChangeEvent<HTMLInputElement>, idx: number) => {
        const file = e.target.files[0];

        const isValid = checkValidationFile(file);
        if (!isValid) return;

        const result = await uploadFile({ variables: { file } });
        const url = result.data.uploadFile.url;

        setImageUrls((prev) => {
            const newUrls = [...prev];
            newUrls[idx] = url;
            return newUrls;
        });
    };

    const onDeleteImage = (idx: number) => {
        setImageUrls((prev) => {
            const newUrls = [...prev];
            newUrls[idx] = "/images/addImage.png";
            return newUrls;
        });
    };

    return {
        isOpen,
        imageRefs,
        imageUrls,
        onClickUpdate,
        onClickSubmit,
        showModal,
        handleOk,
        handleCancel,
        handleComplete,
        onClickImage,
        onChangeImage,
        onDeleteImage,
    };
};

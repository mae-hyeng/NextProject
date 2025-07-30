"use client";

import { useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { IMyVariables } from "./types";
import { checkValidationFile } from "@/commons/libraries/validationFile";
import {
    CreateBoardDocument,
    FetchBoardQuery,
    UpdateBoardDocument,
    UploadFileDocument,
} from "@/commons/graphql/graphql";

export const useBoardsWrite = (data: FetchBoardQuery) => {
    useEffect(() => {
        if (data?.fetchBoard?.boardAddress) {
            setZipcode(data.fetchBoard.boardAddress.zipcode ?? "");
            setAddress(data.fetchBoard.boardAddress.address ?? "");
            setAddressDetail(data.fetchBoard.boardAddress.addressDetail ?? "");
            setYoutubeUrl(data.fetchBoard.youtubeUrl ?? "");
        }

        if (data?.fetchBoard?.images) {
            setImageUrls(data.fetchBoard.images);
        }
    }, [data]);

    const [writer, setWriter] = useState("");
    const [password, setPassword] = useState("");
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");

    const [isOpen, setIsOpen] = useState(false);
    const [zipcode, setZipcode] = useState("");
    const [address, setAddress] = useState("");
    const [addressDetail, setAddressDetail] = useState("");

    const [youtubeUrl, setYoutubeUrl] = useState("");

    const [createBoard] = useMutation(CreateBoardDocument);
    const [updateBoard] = useMutation(UpdateBoardDocument);

    const router = useRouter();
    const params = useParams();

    // imgs
    const imageRefs = useRef<(HTMLInputElement | null)[]>([]);

    const [imageUrls, setImageUrls] = useState(["", "", ""]);

    const [uploadFile] = useMutation(UploadFileDocument);

    const onChangeInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === "writer") setWriter(value);
        else if (name === "password") setPassword(value);
        else if (name === "title") setTitle(value);
        else if (name === "content") setContents(value);
        else if (name === "addressDetail") setAddressDetail(value);
        else if (name === "youtubeUrl") setYoutubeUrl(value);

        if (name === "addressDetail" || name === "youtubeUrl") return;

        if (value) document.getElementById(`${name}-error`).innerText = "";
    };

    const onClickSubmit = async () => {
        if (!writer) document.getElementById("writer-error").innerText = "작성자를 입력해주세요";

        if (!password)
            document.getElementById("password-error").innerText = "비밀번호를 입력해주세요";

        if (!title) document.getElementById("title-error").innerText = "제목을 입력해주세요";

        if (!contents) document.getElementById("content-error").innerText = "내용을 입력해주세요";

        try {
            const result = await createBoard({
                variables: {
                    writer: writer,
                    title: title,
                    contents: contents,
                    password: password,
                    youtubeUrl: youtubeUrl,
                    boardAddress: {
                        zipcode,
                        address,
                        addressDetail,
                    },
                    images: imageUrls,
                },
            });

            router.push(`/boards/detail/${result.data.createBoard._id}`);
        } catch (error) {
            console.log(error);
            alert("에러가 발생하였습니다. 다시 시도해 주세요.");
        }
    };

    const onClickUpdate = async () => {
        const pw = prompt("글을 입력할때 입력하셨던 비밀번호를 입력해주세요");
        try {
            const myVariables: IMyVariables = {
                updateBoardInput: {
                    youtubeUrl: youtubeUrl,
                    boardAddress: {
                        zipcode,
                        address,
                        addressDetail,
                    },
                },
                password: pw,
                boardId: params.boardId,
            };

            if (title) myVariables.updateBoardInput.title = title;
            if (contents) myVariables.updateBoardInput.contents = contents;
            if (imageUrls) myVariables.updateBoardInput.images = imageUrls;

            const result = await updateBoard({ variables: myVariables });
            router.push(`/boards/detail/${result.data.updateBoard._id}`);
        } catch (error) {
            console.log(error);
            alert("비밀번호가 일치하지 않습니다!");
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
        console.log(data);
        setZipcode(data.zonecode);
        setAddress(data.address);
        setAddressDetail("");
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
        zipcode,
        address,
        addressDetail,
        youtubeUrl,
        imageRefs,
        imageUrls,
        onChangeInput,
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

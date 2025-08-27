"use client";

import { useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { IBoardVariables, IUseBoardWriteProps } from "./types";
import { checkValidationFile } from "@/commons/libraries/validationFile";
import { CreateBoardDocument, UploadFileDocument } from "@/commons/graphql/graphql";
import { UPDATE_BOARD } from "@/commons/apis/mutations/mutations";
import { Modal } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { useAuthStore } from "@/commons/stores/authStore";

export const useBoardsWrite = ({ data, reset, setValue }: IUseBoardWriteProps) => {
    const [user, setUser] = useState(null);
    const { user: authUser } = useAuthStore();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) setUser(userInfo);
    }, [authUser]);

    useEffect(() => {
        if (data?.fetchBoard?.boardAddress) {
            reset({
                zipcode: data.fetchBoard.boardAddress.zipcode ?? "",
                address: data.fetchBoard.boardAddress.address ?? "",
                addressDetail: data.fetchBoard.boardAddress.addressDetail ?? "",
                youtubeUrl: data.fetchBoard.youtubeUrl ?? "",
            });
        }

        if (data?.fetchBoard?.images) {
            setImageUrls(data.fetchBoard.images);
        }
    }, [data]);

    const [password, setPassword] = useState("");

    const [isOpen, setIsOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [createBoard] = useMutation(CreateBoardDocument);
    const [updateBoard] = useMutation(UPDATE_BOARD);

    const router = useRouter();
    const params = useParams();

    // imgs
    const imageRefs = useRef<(HTMLInputElement | null)[]>([]);

    const [imageUrls, setImageUrls] = useState(["", "", ""]);
    const [files, setFiles] = useState<File[]>([]);

    const [uploadFile] = useMutation(UploadFileDocument);

    const onClickSubmit = async (data) => {
        const results = await Promise.all(files.map((file) => uploadFile({ variables: { file } })));
        const images = results.map((file) => file.data.uploadFile.url);

        try {
            const result = await createBoard({
                variables: {
                    writer: data.writer,
                    title: data.title,
                    contents: data.contents,
                    password: data.password,
                    youtubeUrl: data.youtubeUrl,
                    boardAddress: {
                        zipcode: data.zipcode,
                        address: data.address,
                        addressDetail: data.addressDetail,
                    },
                    images,
                },
                update(cache, { data }) {
                    cache.modify({
                        fields: {
                            fetchBoards: (prev) => {
                                return [data.createBoard, ...prev];
                            },
                        },
                    });
                },
            });

            router.push(`/boards/detail/${result.data.createBoard._id}`);
        } catch (error) {
            Modal.error({
                content: `${error}`,
                onOk: () => {
                    setIsEditModalOpen(false);
                },
            });
        }
    };

    const onClickUpdate = async (data) => {
        const results = await Promise.all(files.map((file) => uploadFile({ variables: { file } })));
        const resultUrls = results.map((file, idx) =>
            !file ? imageUrls[idx] : file.data.uploadFile.url
        );
        const images = resultUrls.length ? resultUrls : imageUrls;
        try {
            const variables: IBoardVariables = {
                updateBoardInput: {
                    youtubeUrl: data.youtubeUrl,
                    boardAddress: {
                        zipcode: data.zipcode,
                        address: data.address,
                        addressDetail: data.addressDetail,
                    },
                },
                password,
                boardId: Array.isArray(params.boardId) ? params.boardId[0] : params.boardId,
            };

            if (data.title) variables.updateBoardInput.title = data.title;
            if (data.contents) variables.updateBoardInput.contents = data.contents;
            if (images && images.length) variables.updateBoardInput.images = images;

            const result = await updateBoard({ variables });
            router.push(`/boards/detail/${result.data.updateBoard._id}`);
        } catch (error) {
            Modal.error({
                content: "비밀번호가 일치하지 않습니다!",
                onOk: () => {
                    setIsEditModalOpen(false);
                    setPassword("");
                },
            });
        }
    };

    const onChangeContents = (value: string) => {
        const defaultValue = value === "<p><br></p>" ? "" : value;
        setValue("contents", defaultValue, { shouldValidate: true });
    };

    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
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

    const showEditModal = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsEditModalOpen(true);
    };

    const editModalClose = () => {
        setIsEditModalOpen(false);
    };

    const handleComplete = (data: {
        zonecode: SetStateAction<string>;
        address: SetStateAction<string>;
    }) => {
        setIsOpen(false);
        setValue("zipcode", data.zonecode);
        setValue("address", data.address);
        setValue("addressDetail", "");
    };

    const onClickImage = (idx: string | number) => {
        imageRefs.current[idx]?.click();
    };

    const onChangeImage = async (e: ChangeEvent<HTMLInputElement>, idx: number) => {
        const file = e.target.files[0];

        const isValid = checkValidationFile(file);
        if (!isValid) return;

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = (e) => {
            if (typeof e.target.result === "string") {
                const tempUrls = [...imageUrls];
                tempUrls[idx] = e.target.result;
                setImageUrls(tempUrls);

                const tempFiles = [...files];
                tempFiles[idx] = file;
                setFiles(tempFiles);
            }
        };
    };

    const onDeleteImage = (idx: number) => {
        setImageUrls((prev) => {
            const newUrls = [...prev];
            newUrls.splice(idx, 1);
            return newUrls;
        });
    };

    return {
        user,
        isOpen,
        isEditModalOpen,
        imageRefs,
        imageUrls,
        password,
        onChangeContents,
        onChangePassword,
        onClickUpdate,
        onClickSubmit,
        showModal,
        handleOk,
        handleCancel,
        handleComplete,
        showEditModal,
        editModalClose,
        onClickImage,
        onChangeImage,
        onDeleteImage,
    };
};

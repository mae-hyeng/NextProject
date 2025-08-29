"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { useBoardsWrite } from "./hook";
import { IBoardWriteProps } from "./types";
import { Modal } from "antd";
import { DaumPostcodeEmbed } from "react-daum-postcode";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-quill-new/dist/quill.snow.css";
import { createBoardSchema, updateBoardSchema } from "./schema";
import { ModalUI } from "@/commons/ui/modal";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
export const BoardsWrite = ({ isEdit, data }: IBoardWriteProps) => {
    const { register, handleSubmit, formState, reset, setValue, control } = useForm({
        resolver: zodResolver(isEdit ? updateBoardSchema : createBoardSchema),
        mode: "onChange",
    });

    const {
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
    } = useBoardsWrite({ data, reset, setValue, isEdit });

    return (
        <div className={styles.BoardsNew}>
            <form onSubmit={isEdit ? showEditModal : handleSubmit(onClickSubmit)}>
                <div className={styles.main}>
                    <h5>게시물 {isEdit ? "수정" : "등록"}</h5>
                    <div className={styles.main_section_1}>
                        <div className={styles.section_1_wrapper}>
                            <div>
                                작성자
                                <span className={styles.require_input}>*</span>
                            </div>
                            <input
                                {...register("writer")}
                                placeholder="작성자 명을 입력해 주세요."
                                disabled
                            />
                            <div className={styles.error}>{formState.errors.writer?.message}</div>
                        </div>
                        {!isEdit && (
                            <div className={styles.section_1_wrapper}>
                                <div>
                                    비밀번호<span className={styles.require_input}>*</span>
                                </div>
                                <input
                                    {...register("password")}
                                    placeholder="비밀번호를 입력해 주세요."
                                    type="password"
                                    disabled={isEdit ? true : false}
                                />
                                <div className={styles.error}>
                                    {isEdit && formState.errors.password?.message}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={styles.divideLine}></div>
                    <div className={styles.main_section_2}>
                        <div>
                            제목<span className={styles.require_input}>*</span>
                        </div>
                        <input
                            {...register("title")}
                            placeholder="제목을 입력해 주세요."
                            defaultValue={data?.fetchBoard.title}
                        />
                        <div className={styles.error}>{formState.errors.title?.message}</div>
                    </div>
                    <div className={styles.divideLine}></div>
                    <div className={styles.main_section_3}>
                        <div>
                            내용<span className={styles.require_input}>*</span>
                        </div>
                        <Controller
                            name="contents"
                            control={control}
                            defaultValue={data?.fetchBoard.contents || ""}
                            render={({ field, fieldState }) => (
                                <>
                                    <ReactQuill
                                        {...field}
                                        onChange={onChangeContents}
                                        theme="snow"
                                    />
                                    <div className={styles.error}>{fieldState.error?.message}</div>
                                </>
                            )}
                        />
                    </div>

                    <div className={styles.main_section_4}>
                        <div>주소</div>
                        <div className={styles.address_area_1}>
                            <input placeholder="01234" {...register("zipcode")} readOnly />
                            <button type="button" onClick={showModal}>
                                우편번호 검색
                            </button>
                        </div>
                        <div>
                            <input
                                placeholder="주소를 입력해 주세요."
                                {...register("address")}
                                readOnly
                            />
                        </div>
                        <div>
                            <input {...register("addressDetail")} placeholder="상세주소" />
                        </div>
                    </div>

                    {isOpen && (
                        <Modal open={true} onOk={handleOk} onCancel={handleCancel}>
                            <DaumPostcodeEmbed onComplete={handleComplete} />
                        </Modal>
                    )}

                    <div className={styles.main_section_5}>
                        <div>유튜브 링크</div>
                        <input {...register("youtubeUrl")} placeholder="링크를 입력해 주세요" />
                    </div>
                    <div className={styles.main_section_6}>
                        <div>사진 첨부</div>
                        <div className={styles.img_wrapper}>
                            {Array(3)
                                .fill(0)
                                .map((_, idx) => (
                                    <div key={idx} className={styles.img_position}>
                                        <Image
                                            src={
                                                imageUrls[idx]
                                                    ? imageUrls[idx].startsWith("codecamp")
                                                        ? `https://storage.googleapis.com/${imageUrls[idx]}`
                                                        : imageUrls[idx]
                                                    : "/images/addImage.png"
                                            }
                                            alt={`이미지추가버튼${idx + 1}`}
                                            width={300}
                                            height={300}
                                            onClick={() => onClickImage(idx)}
                                        />
                                        <input
                                            type="file"
                                            className={styles.image_input}
                                            onChange={(e) => onChangeImage(e, idx)}
                                            ref={(el) => {
                                                imageRefs.current[idx] = el;
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => onDeleteImage(idx)}
                                            className={styles.image_delete}
                                        >
                                            X
                                        </button>
                                    </div>
                                ))}
                            {/* <BoardWriteImage /> */}
                        </div>
                    </div>
                </div>
                <div className={styles.footer}>
                    <button type="button" className={styles.cancel}>
                        취소
                    </button>
                    <button disabled={!formState.isValid} className={styles.submit}>
                        {isEdit ? "수정" : "등록"}하기
                    </button>
                </div>
                <ModalUI open={isEditModalOpen} onClose={editModalClose}>
                    <div className={styles.modal_title}>
                        글을 작성할 때 입력하셨던 비밀번호를 입력해주세요.
                    </div>
                    <div className={styles.modal_input_button_wrapper}>
                        <div className={styles.modal_input_wrapper}>
                            <input
                                className={styles.modal_input}
                                onChange={onChangePassword}
                                value={password}
                            />
                        </div>
                        <div className={styles.modal_button_wrapper}>
                            <button className={styles.modal_button_cancel} onClick={editModalClose}>
                                취소하기
                            </button>
                            <button
                                className={styles.modal_button_submit}
                                onClick={handleSubmit(onClickUpdate)}
                            >
                                수정하기
                            </button>
                        </div>
                    </div>
                </ModalUI>
            </form>
        </div>
    );
};

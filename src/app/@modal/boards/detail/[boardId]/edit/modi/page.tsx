// "use client";

// import { UPDATE_BOARD } from "@/commons/apis/mutations/mutations";
// import { UploadFileDocument } from "@/commons/graphql/graphql";
// import { ModalUI } from "@/commons/ui/modal";
// import { useMutation } from "@apollo/client";
// import { useParams } from "next/navigation";
// import { useRouter } from "next/router";

// const BoardsDetailEdit = () => {
//         const router = useRouter();
//         const params = useParams();

//             const [updateBoard] = useMutation(UPDATE_BOARD);
//             const [uploadFile] = useMutation(UploadFileDocument);

//     const onClickUpdate = async (data) => {
//         const results = await Promise.all(files.map((file) => uploadFile({ variables: { file } })));
//         const resultUrls = results.map((file, idx) =>
//             !file ? imageUrls[idx] : file.data.uploadFile.url
//         );
//         const images = resultUrls.length ? resultUrls : imageUrls;
//         try {
//             const variables: IBoardVariables = {
//                 updateBoardInput: {
//                     youtubeUrl: data.youtubeUrl,
//                     boardAddress: {
//                         zipcode: data.zipcode,
//                         address: data.address,
//                         addressDetail: data.addressDetail,
//                     },
//                 },
//                 password,
//                 boardId: Array.isArray(params.boardId) ? params.boardId[0] : params.boardId,
//             };

//             if (data.title) variables.updateBoardInput.title = data.title;
//             if (data.contents) variables.updateBoardInput.contents = data.contents;
//             if (images && images.length) variables.updateBoardInput.images = images;

//             const result = await updateBoard({ variables });
//             router.push(`/boards/detail/${result.data.updateBoard._id}`);
//         } catch (error) {
//             Modal.error({
//                 content: "비밀번호가 일치하지 않습니다!",
//                 onOk: () => {
//                     setIsEditModalOpen(false);
//                     setPassword("");
//                 },
//             });
//         }
//     };

//     return (
//                         <ModalUI open={isEditModalOpen} onClose={editModalClose}>
//                     <div className={styles.modal_title}>
//                         글을 작성할 때 입력하셨던 비밀번호를 입력해주세요.
//                     </div>
//                     <div className={styles.modal_input_button_wrapper}>
//                         <div className={styles.modal_input_wrapper}>
//                             <input
//                                 type="password"
//                                 className={styles.modal_input}
//                                 onChange={onChangePassword}
//                                 value={password}
//                             />
//                         </div>
//                         <div className={styles.modal_button_wrapper}>
//                             <button className={styles.modal_button_cancel} onClick={editModalClose}>
//                                 취소하기
//                             </button>
//                             <button
//                                 className={styles.modal_button_submit}
//                                 onClick={handleSubmit(onClickUpdate)}
//                             >
//                                 수정하기
//                             </button>
//                         </div>
//                     </div>
//                 </ModalUI>
//     )
// }

// export default BoardsDetailEdit

"use client";

import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill-new"), {
    ssr: false,
});

export default function WebEditorPage() {
    const router = useRouter();
    const { register, handleSubmit, setValue, trigger } = useForm({
        mode: "onChange",
    });

    const onChangeContents = (value) => {
        console.log(value);

        setValue("contents", value);

        trigger("contents");
    };

    const onSubmit = async (data) => {
        const { Modal } = await import("antd"); // code-spliting
        Modal.success({ content: "게시글 등록에 성공했습니다" });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            작성자 : <input type="text" {...register("writer")} />
            <br />
            비밀번호 : <input type="password" {...register("password")} />
            <br />
            제목 : <input type="text" {...register("title")} />
            <br />
            내용 : <ReactQuill onChange={onChangeContents} />
            <br />
            <button>등록하기</button>
        </form>
    );
}

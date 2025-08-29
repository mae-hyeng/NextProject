import z from "zod/v3";

export const boardCommentSchema = z.object({
    writer: z.string().min(1, { message: "작성자를 입력해 주세요." }),
    password: z.string().min(1, { message: "비밀번호를 입력해 주세요." }),
    contents: z.string().min(1, { message: "내용을 입력해 주세요." }),
});

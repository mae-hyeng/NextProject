import z from "zod/v3";

export const schema = z.object({
    password: z.string().min(1, { message: "변경할 비밀번호를 입력해 주세요.." }),
    newPassword: z.string().min(1, { message: "변경할 비밀번호를 다시 한 번 입력해 주세요." }),
});

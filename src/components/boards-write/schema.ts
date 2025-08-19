import z from "zod/v3";

export const createBoardSchema = z.object({
    writer: z.string().min(1, { message: "작성자를 입력해 주세요." }),
    password: z.string().min(1, { message: "비밀번호를 입력해 주세요." }),
    title: z.string().min(1, { message: "내용을 입력해 주세요." }),
    contents: z.string().min(1, { message: "내용을 입력해 주세요." }),
    zipcode: z.string(),
    address: z.string(),
    addressDetail: z.string(),
    youtubeUrl: z.string(),
});

export const updateBoardSchema = createBoardSchema.extend({
    password: z.string().optional(),
});

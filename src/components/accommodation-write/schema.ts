import z from "zod/v3";

export const schema = z.object({
    name: z.string().min(1, { message: "상품 이름을 입력해 주세요." }),
    remarks: z.string().min(1, { message: "상품을 한줄로 요약해주세요." }),
    contents: z.string().min(1, { message: "상품을 소개해주세요." }),
    price: z.string().min(1, { message: "상품 가격을 입력해 주세요." }),
    tags: z.string(),
    zipcode: z.string(),
    address: z.string().min(1, { message: "주소를 입력해 주세요." }),
    addressDetail: z.string().min(1, { message: "상세주소를 입력해 주세요." }),
    lat: z.string(),
    lng: z.string(),
});

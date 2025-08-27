import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_USER } from "@/commons/apis/mutations/mutations";
import "@ant-design/v5-patch-for-react-19";
import { Modal } from "antd";
import { useRouter } from "next/navigation";

export const useSignIn = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");

    const [emailError, setEmailError] = useState("");
    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordCheckError, setPasswordCheckError] = useState("");

    const router = useRouter();

    const [createUser] = useMutation(CREATE_USER);

    const onChangeInput = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case "email":
                setEmail(value);
                if (value) setEmailError("");
                break;
            case "name":
                setName(value);
                if (value) setNameError("");
                break;
            case "password":
                setPassword(value);
                if (value) setPasswordError("");
                break;
            case "password-check":
                setPasswordCheck(value);
                if (value) setPasswordCheckError("");
                break;
        }
    };

    const onClickSignIn = () => {
        if (!email) setEmailError("이메일을 입력해주세요");

        if (!name) setNameError("이름을 입력해주세요");

        if (!password) setPasswordError("비밀번호를 입력해주세요");

        if (!passwordCheck || password !== passwordCheck)
            setPasswordCheckError("비밀번호를 입력해주세요");

        if (!email || !name || !password || !passwordCheck || password !== passwordCheck) return;

        try {
            const result = createUser({
                variables: {
                    email,
                    password,
                    name,
                },
            });
            Modal.success({
                content: "회원가입을 축하드립니다!",
                onOk: () => router.push("/login"),
            });
        } catch (error) {
            Modal.error({
                content: `${error} 확인해주세요.`,
            });
        }
    };

    return {
        emailError,
        nameError,
        passwordError,
        passwordCheckError,
        onClickSignIn,
        onChangeInput,
    };
};

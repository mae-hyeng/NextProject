import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { LOGIN_USER } from "./queries";
import { useRouter } from "next/navigation";
import { useAccessTokenStore } from "@/commons/stores/useAccessTokenStore";
import { useAuthStore } from "@/commons/stores/authStore";
import { FETCH_USER } from "@/commons/hooks/queries";

export const UseLogin = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const router = useRouter();
    const { setAccessToken } = useAccessTokenStore();

    const [loginUser] = useMutation(LOGIN_USER);
    const [fetchUser, { data: userData }] = useLazyQuery(FETCH_USER);

    const { setUser } = useAuthStore();

    const onChangeInput = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case "email":
                setEmail(value);
                if (value) setEmailError(false);
                break;
            case "password":
                setPassword(value);
                if (value) setPasswordError(false);
                break;
        }
    };

    const onClickLogin = async () => {
        if (!email) setEmailError(true);
        if (!password) setEmailError(true);

        if (!email || !password) return;

        try {
            const result = await loginUser({
                variables: {
                    email,
                    password,
                },
            });

            const accessToken = result.data.loginUser.accessToken;
            setAccessToken(accessToken);
            localStorage.setItem("accessToken", accessToken);

            const userInfo = await fetchUser({ variables: { email } });
            localStorage.setItem("userInfo", JSON.stringify(userInfo.data.fetchUser));

            // setUser({
            //     id: userInfo.data.fetchUser._id,
            //     name: userInfo.data.fetchUser.name,
            //     email: userInfo.data.fetchUser.email,
            // });

            router.push("/boards");
        } catch (error) {
            console.log(error);
        }
    };

    const onClickSignIn = () => {
        router.push("/signIn");
    };

    return {
        emailError,
        passwordError,
        onChangeInput,
        onClickLogin,
        onClickSignIn,
    };
};

"use client";

import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache } from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { useAccessTokenStore } from "../stores/useAccessTokenStore";
import { useEffect } from "react";

interface IApolloUploadSetting {
    children: React.ReactNode;
}
export default function ApolloUploadSetting(props: IApolloUploadSetting) {
    const { accessToken, setAccessToken } = useAccessTokenStore();

    useEffect(() => {
        setAccessToken(localStorage.getItem("accessToken") ?? "");
    }, []);

    const uploadLink = createUploadLink({
        uri: "http://main-practice.codebootcamp.co.kr/graphql",
        headers: { Authorization: `Bearer ${accessToken}` },
    });

    const client = new ApolloClient({
        link: ApolloLink.from([uploadLink]),
        cache: new InMemoryCache(),
    });

    return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}

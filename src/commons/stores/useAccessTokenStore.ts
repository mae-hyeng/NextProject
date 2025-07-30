import { create } from "zustand";
import { AccessTokenState } from "./types";

export const useAccessTokenStore = create<AccessTokenState>((set) => {
    return {
        accessToken: "",
        setAccessToken: (newAccessToken) =>
            set(() => {
                return {
                    accessToken: newAccessToken,
                };
            }),
    };
});

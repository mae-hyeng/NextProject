export interface AccessTokenState {
    accessToken: string;
    setAccessToken: (newAccessToken: string) => void;
}

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface AuthState {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
}

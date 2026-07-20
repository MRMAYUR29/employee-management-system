import { STORAGE_KEYS } from "../constants/storageKeys";

export const saveAuth = (response) => {
    localStorage.setItem(
        STORAGE_KEYS.ACCESS_TOKEN,
        response.accessToken
    );

    localStorage.setItem(
        STORAGE_KEYS.REFRESH_TOKEN,
        response.refreshToken
    );

    localStorage.setItem(
        STORAGE_KEYS.USER,
        JSON.stringify(response.user)
    );
};

export const clearAuth = () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
};
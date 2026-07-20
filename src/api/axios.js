import axios from "axios";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { clearAuth } from "../utils/authStorage";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem(
                    STORAGE_KEYS.REFRESH_TOKEN
                );

                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/auth/refresh`,
                    {
                        refreshToken,
                    }
                );

                const newAccessToken = response.data.accessToken;

                localStorage.setItem(
                    STORAGE_KEYS.ACCESS_TOKEN,
                    newAccessToken
                );

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return api(originalRequest);
            } catch (refreshError) {

                clearAuth()

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
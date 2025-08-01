import axios from "axios";
import Cookies from "js-cookie";
import { API_SERVER_URL, API_URL } from "./api.config";
import { removeTokensStorage } from "@/services/auth.service";
import { AuthService } from "@/services/auth.service";
import { errorCatch, getContentType } from "./api.helper";
import { IS_PRODUCTION } from "./api.config";

export const axiosClassic = axios.create({
  baseURL: IS_PRODUCTION ? API_SERVER_URL : API_URL,
  headers: getContentType(),
});

export const instance = axios.create({
  baseURL: API_URL,
  headers: getContentType(),
});

instance.interceptors.request.use((config) => {
  const accessToken = Cookies.get("accessToken");

  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

instance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originRequest = error.config;

    if (
      (error.response.status === 401 ||
        errorCatch(error) === "jwt expired" ||
        errorCatch(error) === "jwt must be provided") &&
      error.config &&
      !error.config._isRetry
    ) {
      originRequest._isRetry = true;
      try {
        await AuthService.getNewTokens();
        return instance.request(originRequest);
      } catch (error) {
        if (errorCatch(error) === "jwt expired") removeTokensStorage();
      }
    }

    throw error;
  }
);

export default instance;

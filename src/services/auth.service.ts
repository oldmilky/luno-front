import Cookies from "js-cookie";
import { getContentType } from "@/api/api.helper";
import { axiosClassic } from "@/api/interceptors";
import { getAuthUrl } from "@/api/api.config";
import { IAuthResponse, ITokens } from "@/store/user/user.interface";

// Save tokens to cookies
export const saveTokensStorage = (data: ITokens) => {
  Cookies.set("accessToken", data.accessToken);
  Cookies.set("refreshToken", data.refreshToken);
};

export const saveToStorage = (data: IAuthResponse) => {
  saveTokensStorage(data);
  localStorage.setItem("user", JSON.stringify(data.user));
};

export const removeTokensStorage = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};

// Auth service
export const AuthService = {
  async register(
    email: string,
    password: string,
    confirmPassword: string,
    nickname: string
  ) {
    const response = await axiosClassic.post<IAuthResponse>(
      getAuthUrl("/register"),
      {
        email,
        password,
        confirmPassword,
        nickname,
      }
    );
    if (response.data.accessToken) {
      saveToStorage(response.data);
    }
    return response;
  },

  async login(email: string, password: string) {
    const response = await axiosClassic.post<IAuthResponse>(
      getAuthUrl("/login"),
      {
        email,
        password,
      }
    );
    if (response.data.accessToken) {
      saveToStorage(response.data);
    }
    return response;
  },

  logout() {
    removeTokensStorage();
    localStorage.removeItem("user");
  },

  async getNewTokens() {
    const refreshToken = Cookies.get("refreshToken");
    const response = await axiosClassic.post<IAuthResponse>(
      getAuthUrl("/login/access-token"),
      {
        refreshToken,
      },
      {
        headers: getContentType(),
      }
    );
    if (response.data.accessToken) {
      saveToStorage(response.data);
    }
    return response;
  },
};

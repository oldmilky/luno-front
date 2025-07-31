import { IUser } from "@/interfaces/user.interface";

export interface IUserState {
  email: string;
  isAdmin: boolean;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IInitialState {
  user: IUserState | null;
  isLoading: boolean;
}

export interface IEmailPassword {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}

export interface IAuthResponse extends ITokens {
  user: IUser & {
    isAdmin: boolean;
  };
}

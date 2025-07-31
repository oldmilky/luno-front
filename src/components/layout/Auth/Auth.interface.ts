export interface IAuthInput {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}

export interface IAuthFields {
  isPasswordRequired?: boolean;
}

import { NextPage } from "next";

export interface IUser {
  _id: string;
  email: string;
  nickname: string;
  confirmPassword: string;
  newPassword?: string;
  currentPassword?: string;
  password: string;
  createdAt: string;
  isAdmin: boolean;
}

export type TypeRoles = { isOnlyAdmin?: boolean; isOnlyUser?: boolean };
export type NextPageAuth<P = {}> = NextPage<P> & TypeRoles;
export type TypeComponentAuthFields = { Component: TypeRoles };

export interface IProfileInput
  extends Pick<IUser, "email" | "password" | "confirmPassword" | "nickname"> {}

export const API_URL = `${process.env.APP_URL}/api`;
export const API_SERVER_URL = `${process.env.APP_SERVER_URL}/api`;
export const IS_SERVER = typeof window === "undefined";
export const IS_CLIENT = typeof window !== "undefined";
export const IS_PRODUCTION = process.env.APP_ENV === "production";

export const getAuthUrl = (string: string) => `/auth${string}`;
export const getUsersUrl = (string: string) => `/users${string}`;
export const getServicesUrl = (string: string) => `/services${string}`;
export const getProjectsUrl = (string: string) => `/projects${string}`;
export const getBlogsUrl = (string: string) => `/blogs${string}`;
export const getContactsUrl = (string: string) => `/contacts${string}`;
export const getAdminUrl = (url: string) => `/manage/${url}`;

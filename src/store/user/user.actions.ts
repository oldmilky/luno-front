import { createAsyncThunk } from "@reduxjs/toolkit";
import { errorCatch } from "@/api/api.helper";
import { AuthService } from "@/services/auth.service";
import { IAuthResponse, IEmailPassword } from "./user.interface";
import { toastSuccess, toastError } from "@/components/ui/Toast/Toast";

// Register
export const register = createAsyncThunk<IAuthResponse, IEmailPassword>(
  "auth/register",
  async ({ email, password, confirmPassword, nickname }, thunkAPI) => {
    try {
      const response = await AuthService.register(
        email,
        password,
        confirmPassword,
        nickname
      );
      toastSuccess("Registration is now complete!");
      return response.data;
    } catch (error) {
      toastError("This email is already in use");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Login
export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await AuthService.login(email, password);
      toastSuccess("Authorization is now complete!");
      return response.data;
    } catch (error) {
      toastError("Invalid login or password");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Logout
export const logout = createAsyncThunk("auth/logout", async (_, thunk) => {
  await AuthService.logout();
});

// Check Auth
export const checkAuth = createAsyncThunk<IAuthResponse>(
  "auth/check-auth",
  async (_, thunkAPI) => {
    try {
      const response = await AuthService.getNewTokens();
      return response.data;
    } catch (error) {
      if (errorCatch(error) === "jwt expired") {
        thunkAPI.dispatch(logout());
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

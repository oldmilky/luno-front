import { createSlice } from "@reduxjs/toolkit";
import { getStoreLocal } from "@/utils/localStorage";
import { checkAuth, login, logout, register } from "./user.actions";
import { IInitialState } from "./user.interface";

const initialState: IInitialState = {
  isLoading: false,
  user: getStoreLocal("user"),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      // login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      // logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(logout.rejected, (state) => {
        state.user = null;
      })
      // check auth
      .addCase(checkAuth.fulfilled, (state, { payload }) => {
        state.user = payload.user;
      });
  },
});

export const { reducer } = userSlice;

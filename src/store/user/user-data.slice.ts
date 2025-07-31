import { UserService } from "@/services/user.service";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserProfile = createAsyncThunk(
  "userProfile/fetchUserProfile",
  async () => {
    const response = await UserService.getProfile();
    return response.data;
  }
);

const initialState = {
  userData: null,
  email: "",
  nickname: "",
  status: "idle",
};

export const dataUser = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state: any, action) => {
        state.status = "succeeded";
        state.userData = action.payload;
        state.email = action.payload.email;
        state.nickname = action.payload.nickname;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const { reducer } = dataUser;
export const { setUserData } = dataUser.actions;

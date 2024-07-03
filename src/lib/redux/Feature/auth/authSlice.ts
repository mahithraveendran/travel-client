import { IUser } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface IAuthState {
  user: IUser | null;
  token: string | null;
}

const initialState: IAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // set user
    setUser(state, { payload }) {
      state.user = { ...payload.user };
      state.token = payload.token;
    },

    // log out user
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export const authReducers = authSlice.reducer;

// select user
export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;

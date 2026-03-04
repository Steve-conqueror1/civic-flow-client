import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthUser } from "@/types";
import { RootState } from "./redux";
import { Role } from "@/types/auth";

type AuthState = {
  authUser: AuthUser | null;
  role: Role;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  authUser: null,
  role: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser(state, action: PayloadAction<{ user: AuthUser }>) {
      state.authUser = action.payload.user;
      state.role = action.payload.user.role;
      state.isAuthenticated = true;
    },
    clearAuth(state) {
      state.authUser = null;
      state.role = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthUser, clearAuth } = authSlice.actions;

export const selectAuthUser = (state: RootState) => state.auth.authUser;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectRole = (state: RootState) => state.auth.role;

export default authSlice.reducer;

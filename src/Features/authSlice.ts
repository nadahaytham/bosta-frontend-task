import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../Types/authorization";

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  username: localStorage.getItem("username"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string; username: string }>) {
      state.token = action.payload.token;
      state.username = action.payload.username;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.username);
    },

    logout(state) {
      state.token = null;
      state.username = null;

      localStorage.removeItem("token");
      localStorage.removeItem("username");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  loggedIn: false,
  biz: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.loggedIn = true;
    },
    logout(state) {
      state.loggedIn = false;
    },
    updateBiz(state) {
      state.biz = true;
    },
    cancelBiz(state) {
      state.biz = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;

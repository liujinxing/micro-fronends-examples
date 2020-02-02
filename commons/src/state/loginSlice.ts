import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * 用户信息
 */
export interface UserInfo {
  /**
   * 人员id
   */
  userId: string;
  /**
   * 人员姓名
   */
  userName: string;
  /**
   * 部门id
   */
  deptId: string;
  /**
   * 部门名称
   */
  deptName: string;
}

/**
 * 登录状态
 */
export interface LoginState {
  /**
   * 是否已经登录
   */
  isLogged: boolean;
  /**
   * 当前登录用户信息
   */
  currentUser?: UserInfo;
}

const initialLoginState: LoginState = {
  isLogged: false
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialLoginState,
  reducers: {
    /**
     * 登录
     *
     * @param state 状态
     * @param action 动作
     */
    login(state, action: PayloadAction<UserInfo>) {
      state.isLogged = true;
      state.currentUser = action.payload;
    },
    /**
     * 退出登录
     *
     * @param state 状态
     */
    logout(state) {
      state.isLogged = false;
      state.currentUser = undefined;
    }
  }
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;

import { useState, useCallback, useReducer, useEffect } from "react";
import { UserInfo, login, logout, LoginState } from "./loginSlice";

/**
 * 登录状态hook
 */
export default function useLogin(): [
  LoginState,
  {
    login: (currentUser: UserInfo) => void;
    logout: () => void;
  }
] {
  const store = window.__SINOUIAPP_STORE__;
  const [loginState, setLoginState] = useState(() => store.getState().login);

  const _login = useCallback((currentUserInfo: UserInfo) => {
    store.dispatch(login(currentUserInfo));
    setLoginState(store.getState().login);
  }, []);

  const _logout = useCallback(() => {
    store.dispatch(logout());
    setLoginState(store.getState().login);
  }, []);

  useEffect(() => {
    return store.subscribe(() => {
      setLoginState(store.getState().login);
    });
  }, []);

  return [loginState, { login: _login, logout: _logout }];
}

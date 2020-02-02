import { useState, useEffect } from "react";

/**
 * 获取当前用户信息的hook
 */
export default function useCurrentUser() {
  const store = window.__SINOUIAPP_STORE__;
  const userInfo = store.getState().login.currentUser;
  const [currentUser, setCurrentUser] = useState(userInfo);

  if (userInfo !== currentUser) {
    setCurrentUser(userInfo);
  }

  useEffect(() => {
    return store.subscribe(() => {
      setCurrentUser(store.getState().login.currentUser);
    });
  }, []);

  return userInfo;
}

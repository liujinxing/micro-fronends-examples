import React from "react";
import { useLogin } from "@sinouiapp/commons";

export default function Login() {
  const [loginState, { login, logout }] = useLogin();

  return loginState.isLogged ? (
    <div>
      欢迎{loginState.currentUser?.userName}
      <button onClick={logout}>退出</button>
    </div>
  ) : (
    <div>
      <button
        onClick={() => {
          login({
            userName: "张三",
            userId: "001",
            deptName: "部门1",
            deptId: "001001"
          });
        }}
      >
        登录
      </button>
    </div>
  );
}

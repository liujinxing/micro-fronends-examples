import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link } from "react-router-dom";
import ModuleLoader from "./ModuleLoader";
import { createHistory, useTheme, createStore } from "@sinouiapp/commons";
import ThemeColorChange from "./ThemeColorChange";
import { ThemeProvider } from "styled-components";
import Login from "./Login";

const appHistory = createHistory("app-shell", true);
createStore({
  theme: {
    color: "yellow"
  }
});

const App = () => {
  const [theme] = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <Router history={appHistory}>
        <div>
          Hello, app shell!
          <Login />
          <ThemeColorChange />
          <ul>
            <li>
              <Link to="/module-a">模块 A</Link>
            </li>
            <li>
              <Link to="/module-a/page-a">模块 A/页面A</Link>
            </li>

            <li>
              <Link to="/module-b">模块 B</Link>
            </li>
            <li>
              <Link to="/module-b/page-a">模块 B/页面A</Link>
            </li>
          </ul>
          <div>
            <Route path="*" component={ModuleLoader}></Route>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("app-shell-root"));

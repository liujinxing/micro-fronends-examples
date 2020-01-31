import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link } from "react-router-dom";
import create from "./app-history";
import ModuleLoader from "./ModuleLoader";

const appHistory = create("app-shell");

const App = () => {
  return (
    <Router history={appHistory}>
      <div>
        Hello, app shell!
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
  );
};

ReactDOM.render(<App />, document.getElementById("app-shell-root"));

import React from "react";
import { Router, Route } from "react-router-dom";
import Loadable from "react-loadable";
import create from "./app-history";

const appHistory = create("module-b");

const PageA = Loadable({
  loader: () => import(/* webpackChunkName: 'PageA' */ "./PageA"),
  loading: () => <div>加载中</div>
});

const PageB = Loadable({
  loader: () => import(/* webpackChunkName: 'PageB' */ "./PageB"),
  loading: () => <div>加载中</div>
});

function App() {
  return (
    <div>
      模块 B
      <Router history={appHistory}>
        <Route path="/module-b/page-a" component={PageA}></Route>
        <Route path="/module-b/page-b" component={PageB}></Route>
      </Router>
    </div>
  );
}

export default App;

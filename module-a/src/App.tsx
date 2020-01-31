import React from "react";
import { Router, Route } from "react-router-dom";
import PageA from "./PageA";
import PageB from "./PageB";
import create from "./app-history";

const history = create("module-a");

function App() {
  return (
    <div>
      模块 A
      <Router history={history}>
        <Route path="/module-a/page-a" component={PageA}></Route>
        <Route path="/module-a/page-b" component={PageB}></Route>
      </Router>
    </div>
  );
}

export default App;

import React from "react";
import { Router, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { createHistory, useTheme } from "@sinouiapp/commons";
import PageA from "./PageA";
import PageB from "./PageB";

const history = createHistory("module-a");

function App() {
  const [theme] = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <div>
        模块 A
        <Router history={history}>
          <Route path="/module-a/page-a" component={PageA}></Route>
          <Route path="/module-a/page-b" component={PageB}></Route>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;

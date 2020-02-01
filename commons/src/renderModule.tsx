import React from "react";
import ReactDOM from "react-dom";
import getModuleRootElementName from "./getModuleRootElementName";
import { EventType, ShowModuleEvent, HideModuleEvent } from "./types";
import registerEvent from "./registerEvent";

/**
 * 渲染模块
 *
 * @param moduleName 模块名称
 * @param App 应用程序入口组件
 */
export default function renderModule(moduleName: string, App: React.ReactType) {
  let isShown = true;
  const rootElement = getModuleRootElementName(moduleName);
  const render = () =>
    ReactDOM.render(<App />, document.getElementById(rootElement));

  registerEvent(EventType.SHOW_MODULE, ({ detail }: ShowModuleEvent) => {
    if (isShown || moduleName !== detail.moduleName) {
      return;
    }

    isShown = true;
    render();
  });

  registerEvent(EventType.HIDE_MODULE, ({ detail }: HideModuleEvent) => {
    if (!isShown || detail.moduleName !== moduleName) {
      return;
    }
    isShown = false;
    ReactDOM.unmountComponentAtNode(document.getElementById(rootElement));
  });

  render();
}

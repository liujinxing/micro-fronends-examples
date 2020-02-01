import { Location, Action } from "history";

/**
 * 事件类型
 */
export enum EventType {
  /**
   * 显示模块
   */
  SHOW_MODULE = "sinouiapp.showmodule",
  /**
   * 隐藏模块
   */
  HIDE_MODULE = "sinouiapp.hidemodule",
  /**
   * 历史发生变更
   */
  HISTORY_CHANGE = "sinouiapp.history.change"
}

/**
 * 显示模块事件
 */
export type ShowModuleEvent = CustomEvent<{ moduleName: string }>;
/**
 * 隐藏模块事件
 */
export type HideModuleEvent = CustomEvent<{ moduleName: string }>;
/**
 * 历史发生变更事件
 */
export type HistoryChangeEvent = CustomEvent<{
  /**
   * 路由位置
   */
  location: Location;
  /**
   * 变更动作
   */
  action: Action;
  /**
   * 事件来源的模块
   */
  from: string;
}>;

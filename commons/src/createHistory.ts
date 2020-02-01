import { createBrowserHistory, createMemoryHistory, Location } from "history";
import isEqual from "react-fast-compare";
import { HistoryChangeEvent, EventType } from "./types";
import dispatchEvent from "./dispatchEvent";
import regsiterEvent from "./registerEvent";

/**
 * 判断是否是相同的路由位置
 *
 * @param location 路由位置
 * @param newLocation 新的路由位置
 */
function isSameLocation(location: Location, newLocation: Location) {
  return (
    location.hash === newLocation.hash &&
    location.pathname === newLocation.pathname &&
    location.search === location.search &&
    isEqual(location.state, newLocation.state)
  );
}

/**
 * 创建历史对象
 *
 * @param moduleName 模块名
 * @param isBrowser 是否启用浏览器特性，将路由同步到浏览器历史中
 */
function createHistory(moduleName: string, isBrowser?: boolean) {
  const appHistory = isBrowser ? createBrowserHistory() : createMemoryHistory();
  let currentLocation = appHistory.location;
  let currentAction = "PUSH";

  if (!isBrowser) {
    appHistory.location = {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
      state: null
    };
  }

  appHistory.listen((location, action) => {
    if (isSameLocation(location, currentLocation) && currentAction === action) {
      return;
    }

    currentLocation = location;
    currentAction = action;
    dispatchEvent(EventType.HISTORY_CHANGE, {
      location,
      action,
      from: moduleName
    });
  });

  regsiterEvent(EventType.HISTORY_CHANGE, (event: HistoryChangeEvent) => {
    const {
      detail: { from, location, action }
    } = event;

    if (
      from !== moduleName &&
      !(currentAction === action && isEqual(location, currentLocation))
    ) {
      appHistory[action.toLowerCase()](location);
      currentLocation = location;
      currentAction = action;
    }
  });

  return appHistory;
}

export default createHistory;

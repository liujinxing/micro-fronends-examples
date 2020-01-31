import { createBrowserHistory, Location, Action } from "history";
import isEqual from "react-fast-compare";

function isSameLocation(location: Location, newLocation: Location) {
  return (
    location.hash === newLocation.hash &&
    location.pathname === newLocation.pathname &&
    location.search === location.search &&
    isEqual(location.state, newLocation.state)
  );
}

type HistoryEvent = CustomEvent<{
  location: Location;
  action: Action;
  from: string;
}>;

function create(moduleName: string) {
  const appHistory = createBrowserHistory();
  let currentLocation = appHistory.location;
  let currentAction = "PUSH";

  appHistory.listen((location, action) => {
    if (isSameLocation(location, currentLocation) && currentAction === action) {
      return;
    }

    currentLocation = location;
    currentAction = action;
    const historyEvent: HistoryEvent = new CustomEvent(
      "sinouiapp.history.change",
      {
        detail: {
          location,
          action,
          from: moduleName
        }
      }
    );
    window.dispatchEvent(historyEvent);
  });

  window.addEventListener("sinouiapp.history.change", (event: HistoryEvent) => {
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

export default create;

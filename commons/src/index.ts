import dispatchEvent from "./dispatchEvent";
import registerEvent from "./registerEvent";
import createHistory from "./createHistory";
import getModuleRootElementName from "./getModuleRootElementName";
import renderModule from "./renderModule";
import useTheme from "./state/useTheme";
import useLogin from "./state/useLogin";
import useCurrentUser from "./state/useCurrentUser";
import createStore from "./state";

export * from "./types";
export {
  dispatchEvent,
  registerEvent,
  createHistory,
  getModuleRootElementName,
  renderModule,
  useTheme,
  useLogin,
  useCurrentUser,
  createStore
};

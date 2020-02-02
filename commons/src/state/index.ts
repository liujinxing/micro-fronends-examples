import { configureStore, Store } from "@reduxjs/toolkit";
import rootReducer, { RootState } from "./rootReducer";

declare global {
  interface Window {
    __SINOUIAPP_STORE__: Store<RootState>;
  }
}

export default function create(preloadedState?: Partial<RootState>) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as any
  });

  window.__SINOUIAPP_STORE__ = store;

  return store;
}

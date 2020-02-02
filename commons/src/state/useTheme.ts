import { useState, useCallback, useEffect } from "react";
import { updateTheme, ThemeState } from "./themeSlice";

/**
 * 主题状态hook
 */
export default function useTheme(): [ThemeState, (color: string) => void] {
  const store = window.__SINOUIAPP_STORE__;
  const [theme, setTheme] = useState(() => store.getState().theme);

  const _setTheme = useCallback(
    (color: string) => {
      store.dispatch(updateTheme({ color }));
      setTheme(store.getState().theme);
    },
    [setTheme]
  );

  useEffect(() => {
    return store.subscribe(() => {
      setTheme(store.getState().theme);
    });
  }, []);

  return [theme, _setTheme];
}

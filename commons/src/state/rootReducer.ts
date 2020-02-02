import { combineReducers } from "@reduxjs/toolkit";
import theme from "./themeSlice";
import login from "./loginSlice";

const rootReducer = combineReducers({
  theme,
  login
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

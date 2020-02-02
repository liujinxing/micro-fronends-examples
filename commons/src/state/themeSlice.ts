import { createSlice, PayloadAction, createStore } from "@reduxjs/toolkit";
/**
 * 当前的主题
 */
interface CurrentTheme {
  color: string;
}

export interface ThemeState {
  color: string;
}

const initialThemeState: ThemeState = {
  color: "red"
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    updateTheme(state, action: PayloadAction<CurrentTheme>) {
      state.color = action.payload.color;
    }
  }
});

export const { updateTheme } = themeSlice.actions;

export default themeSlice.reducer;

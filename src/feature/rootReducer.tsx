import { combineReducers } from "@reduxjs/toolkit";
import home_slice from "./slices/homeSlice";
const rootReducer = combineReducers({
  home: home_slice.reducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;

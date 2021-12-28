import { combineReducers } from "redux";
import { resepReducer } from "./resepReducer";
import { userReducer } from "./userReducer";

export const rootReducers = combineReducers({
    resepReducer, userReducer
})
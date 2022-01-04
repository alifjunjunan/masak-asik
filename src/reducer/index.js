import { combineReducers } from "redux";
import { resepReducer } from "./resepReducer";
import { userReducer } from "./userReducer";
import { artikelReducer} from './artikelReducer'
import {subscribesReducer} from './subscribesReducer'
import {userTransactionReducer} from './userTransactionReducer'

export const rootReducers = combineReducers({
    resepReducer, userReducer, artikelReducer, subscribesReducer, userTransactionReducer
})
import { combineReducers } from "redux";
import { resepReducer } from "./resepReducer";
import { userReducer } from "./userReducer";
import { artikelReducer} from './artikelReducer'
import {subscribesReducer} from './subscribesReducer'
import {userTransactionReducer} from './userTransactionReducer'
import {kategoriResepReducer} from './kategoriResepReducer'
import {kategoriArtikelReducer} from './kategoriArtikelReducer'

export const rootReducers = combineReducers({
    resepReducer, userReducer, artikelReducer, 
    subscribesReducer, userTransactionReducer,
    kategoriResepReducer,kategoriArtikelReducer
})
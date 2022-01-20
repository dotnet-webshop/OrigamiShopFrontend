import {combineReducers} from "redux";
import cartReducer from "./CartReducer";
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import userReducer from "./UserReducer";

const persistConfig = {
    key:'root',
    storage,
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    cart: cartReducer,
    user: userReducer
})

export default persistReducer(persistConfig,rootReducer);
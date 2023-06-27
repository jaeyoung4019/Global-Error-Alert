import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import configSlice from "./slices/configSlice";
import alertSlice from "./slices/alertSlice";
import modalSlice from "./slices/modalSlice";
import userSlice from "./slices/userSlice";
import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import errorAlertSlice from "./slices/errorAlertSlice";

const persistConfig = {
    key: "root",
    storage
};

const reducers = combineReducers({
    configSlice: configSlice,
    alertSlice: alertSlice,
    modalSlice: modalSlice,
    userSlice: userSlice,
    errorAlertSlice: errorAlertSlice
});

export const store = configureStore({
    reducer: persistReducer(persistConfig, reducers),
    middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

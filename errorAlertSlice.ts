import {createSlice, Draft , PayloadAction  } from "@reduxjs/toolkit";


interface ErrorAlertInitialState {
    isShow: boolean,
    errorCode: string,
    onClickCallBackFunction?: () => void
}

const initialState: ErrorAlertInitialState = {
    isShow: false,
    errorCode: "",
    onClickCallBackFunction: () => {}
}

export const errorAlertSlice = createSlice( {
    name: "errorAlert",
    initialState,
    reducers: {
        errorOccurred: (state: Draft<any> , action: PayloadAction<any>) => {
            return {...initialState, ...action.payload, isShow: true}
        },
        errorCheckingComplete: () => {
            return {...initialState, isShow: false}
        },
    }
})

export const {errorOccurred , errorCheckingComplete} = errorAlertSlice.actions;

export default errorAlertSlice.reducer;
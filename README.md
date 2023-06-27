# Global-Error-Alert

## ErrorAlert.tsx

```ts
import React, {useCallback, useRef} from 'react'
import {
    AlertDialog,
    Button,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogCloseButton,
    AlertDialogBody,
    AlertDialogFooter,
} from '@chakra-ui/react';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {alertClose} from "../../store/slices/alertSlice";
import {RootState} from "../../store";
import {errorCheckingComplete} from "../../store/slices/errorAlertSlice";
import {useTranslation} from "react-i18next";

const ErrorAlert = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const cancelRef = useRef(null);
    const {
        isShow,
        errorCode,
        onClickCallBackFunction,
    } = useAppSelector((state: RootState) => state.errorAlertSlice);

    const onClickFunction = useCallback( () => {
        dispatch(errorCheckingComplete())
        if (onClickCallBackFunction && typeof onClickCallBackFunction === 'function') {
            onClickCallBackFunction();
        }
    } , [dispatch, onClickCallBackFunction])

    return (
        <>
            <AlertDialog
                motionPreset="slideInBottom"
                leastDestructiveRef={cancelRef}
                onClose={() => dispatch(alertClose())}
                isOpen={isShow}
                isCentered
            >
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader>{t(`error:${errorCode}:title`)}</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>{t(`error:${errorCode}:message`)}</AlertDialogBody>
                    <AlertDialogFooter>
                        <Button
                            colorScheme="blue"
                            ml={3}
                            onClick={() => {onClickFunction()}}
                        >
                            {t('error:check')}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default ErrorAlert;

```

매개변수로 리덕스를 활용해서 isShow , errorCode  , onClickCallBackFunction 를 받는데,

isShow 는 현재 alert 의 Show and Hide 를 결정합니다.

errorCode 는 메세지와 얼럿창의 제목을 국제화를 통해 내보낼 수 있도록 해줍니다.

onClickCallBackFunction 은 확인 버튼을 눌렀을 때 필요한 콜백함수를 넣어주는 함수입니다.

매개변수로 사용하는 상태값의 리덕스는 아래와 같습니다.

## 리덕스

```ts
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
```

## 사용법

```ts


            <button
                onClick={() => {
                    dispatch(
                        errorOccurred({
                            errorCode: "ERROR.500", // REST API 에서 보내는 요청에 따른 ERROR CODE
                            onClickCallBackFunction: () => {
                                console.log("error!!!");
                            }
                        })
                    );
                }}
            >
                TEST
            </button>

```

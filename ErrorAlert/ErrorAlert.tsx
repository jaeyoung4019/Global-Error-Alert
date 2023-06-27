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
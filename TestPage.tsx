import React, { Fragment, useEffect, useState } from "react";
import TextInput from "../../Components/Form/TextInput";
import { regString } from "../../util/reg";
import useSearchForm from "../../afterTestCode/useSearchForm";
import { useAppDispatch } from "../../store/hooks";
import { errorOccurred } from "../../store/slices/errorAlertSlice";
import { useTranslation } from "react-i18next";

interface valueInterface {
    text1: string;
    text2: string;
}

const TestPage = () => {
    const initTxt = {
        text1: "",
        text2: 0
    };
    const [value, onChangeFunction, reset, debounce, enterKey] = useSearchForm(initTxt);

    useEffect(() => {
        console.log("page", value);
    }, [value]);

    const functionTest = () => {
        console.log("function Test");
    };

    function functionTest1() {
        console.log("function1 Test");
    }

    function testEnterKey(value: any) {
        console.log("test!!!     ", value);
    }

    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    return (
        <Fragment>
            <TextInput
                onChange={debounce("text1")}
                value={value.text1}
                onReg={{ reg: regString, message: "문자만 입력이 가능합니다." }}
                debounce={true}
            />
            <TextInput onChange={onChangeFunction("text2")} value={value.text2} onKeyDown={enterKey(testEnterKey)} />
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
        </Fragment>
    );
};

interface testInterface {
    func: () => void;
}
const ButtonComponentTest = ({ func }: testInterface) => {
    console.log(func);
    return <button onClick={func}> errorTest</button>;
};

export default TestPage;

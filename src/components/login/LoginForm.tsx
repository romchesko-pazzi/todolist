import React from 'react';
import {Login} from "./Login";
import {useAppDispatch} from "../../state/hooks";
import {loginTC} from "../../state/reducers/authReducer";
import {LoginParamsType} from "../../api/login-api";

export const LoginForm = () => {

    const dispatch = useAppDispatch();
    const login = (obj: LoginParamsType) => {
        dispatch(loginTC(obj))
    }

    return (
        <div>
            <Login login={login}/>
        </div>
    );
};

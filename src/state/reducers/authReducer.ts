import {AppThunkType} from "../hooks";
import {authAPI, LoginParamsType} from "../../api/login-api";
import {setError, setLoadingBar} from "./appReducer";

const initialState: AuthDataType = {
    id: null,
    email: "",
    login: "",
    isAuth: false,
    error: "",
}


export const AuthReducer = (state = initialState, action: AuthActionsType): AuthDataType => {
    switch (action.type) {
        case "AUTH/SET-IS-LOGGED-IN": {
            return {...state, isAuth: action.payload.value}
        }
        default:
            return state;
    }
}

export const setIsLoggedIn = (value: boolean) => {
    return {
        type: "AUTH/SET-IS-LOGGED-IN",
        payload: {value},
    } as const;
}

export const loginTC = (obj: LoginParamsType): AppThunkType => async (dispatch) => {
    try {
        dispatch(setLoadingBar("loading"));
        const response = await authAPI.login(obj);
        if (response.data.messages.length > 0) {
            const error = response.data.messages[0];
            dispatch(setError(error));
            return;
        }
        dispatch(setIsLoggedIn(true));
    } catch (err: any) {
        dispatch(setError(err.message));
    } finally {
        dispatch(setLoadingBar("finished"));
    }
}

export const logoutTC = (): AppThunkType => async (dispatch) => {
    try {
        dispatch(setLoadingBar("loading"));
        const response = await authAPI.logout();
        if (response.data.messages.length > 0) {
            const error = response.data.messages[0];
            dispatch(setError(error));
            return;
        }
        dispatch(setIsLoggedIn(false));
    } catch (err: any) {
        dispatch(setError(err.message));
    } finally {
        dispatch(setLoadingBar("finished"));
    }
}


// types
export type AuthActionsType = SetAuthUserDataType;
type SetAuthUserDataType = ReturnType<typeof setIsLoggedIn>
export type AuthDataType = {
    id: number | null,
    email: string,
    login: string,
    isAuth: boolean,
    error: string,
}

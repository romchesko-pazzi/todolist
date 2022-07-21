import {AppThunkType} from "../hooks";
import {authAPI} from "../../api/login-api";
import {setIsLoggedIn} from "./authReducer";

const initialState: AppStateType = {
    appStatus: "idle",
    error: null,
    isInitialized: false,
}

export const AppReducer = (state = initialState, action: AppActionsType): AppStateType => {
    switch (action.type) {
        case "APP/SET_ERROR":
        case "APP/SET_LOADING_BAR": {
            return {...state, ...action.payload};
        }
        case "APP/SET_INITIALIZED": {
            return {...state, isInitialized: action.payload.value}
        }
        default:
            return state;
    }
}

export const setLoadingBar = (appStatus: ErrorsStatusType) => {
    return {
        type: "APP/SET_LOADING_BAR",
        payload: {appStatus},
    } as const;
}
export const setError = (error: string | null) => {
    return {
        type: "APP/SET_ERROR",
        payload: {error},
    } as const;
}
export const setIsInitialized = (value: boolean) => {
    return {
        type: "APP/SET_INITIALIZED",
        payload: {value},
    } as const;
}

export const initializeApp = (): AppThunkType => async (dispatch) => {
    try {
        const isAuthMe = await authAPI.authMe();
        if (isAuthMe.data.resultCode === 0) {
            dispatch(setIsLoggedIn(true));
        } else if (isAuthMe.data.resultCode !== 0) {
            dispatch(setError(isAuthMe.data.messages[0]));
        }
    } catch (err: any) {
        dispatch(setError(err));
    } finally {
        dispatch(setIsInitialized(true));
    }
}


type SetLoadingBarType = ReturnType<typeof setLoadingBar>;
type SetErrorType = ReturnType<typeof setError>;
type SetIsInitializedType = ReturnType<typeof setIsInitialized>;
export type ErrorsStatusType = "loading" | "idle" | "successful" | "finished" | "failed";
export type AppActionsType = SetLoadingBarType | SetErrorType | SetIsInitializedType;
type AppStateType = {
    appStatus: ErrorsStatusType
    error: string | null
    isInitialized: boolean
};

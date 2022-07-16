const initialState: AppStateType = {
    appStatus: "idle",
    error: null,
}

export const AppReducer = (state = initialState, action: AppActionsType): AppStateType => {
    switch (action.type) {
        case "APP/SET_ERROR":
        case "APP/SET_LOADING_BAR": {
            return {...state, ...action.payload};
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


type SetLoadingBarType = ReturnType<typeof setLoadingBar>;
type SetErrorType = ReturnType<typeof setError>;
export type ErrorsStatusType = "loading" | "idle" | "successful" | "finished" | "failed";
export type AppActionsType = SetLoadingBarType | SetErrorType;
type AppStateType = {
    appStatus: ErrorsStatusType
    error: string | null
};

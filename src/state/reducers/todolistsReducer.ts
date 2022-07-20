import {FilterType} from "../../components/todolist/Todolist";
import {todolistsAPI, TodoType} from "../../api/todolist-api";
import {AppThunkType} from "../hooks";
import {ErrorsStatusType, setError, setLoadingBar} from "./appReducer";
import {authAPI} from "../../api/login-api";
import {setIsLoggedIn} from "./authReducer";

export enum TodolistActions {
    SET_TODOLISTS = "TODOLIST/SET_TODOLISTS",
    RENAME_TODOLIST = "TODOLIST/RENAME_TODOLIST",
    ADD_TODOLIST = "TODOLIST/ADD_TODOLIST",
    REMOVE_TODOLIST = "TODOLIST/REMOVE_TODOLIST",
    DISABLE_TODOLIST = "TODOLIST/DISABLE_TODOLIST",
}

const initialState: TodolistType[] = [];

export const TodolistsReducer = (state: TodolistType[] = initialState, action: TodolistsActionType): TodolistType[] => {
    switch (action.type) {
        case TodolistActions.REMOVE_TODOLIST: {
            return state.filter(f => f.id !== action.payload.todolistId);
        }
        case TodolistActions.ADD_TODOLIST: {
            return [{...action.payload.todolist, filter: "all", todoStatus: "idle"}, ...state];
        }
        case TodolistActions.RENAME_TODOLIST: {
            return state.map(m => m.id === action.payload.todolistId ? {...m, title: action.payload.newTitle} : m);
        }
        case TodolistActions.SET_TODOLISTS: {
            return action.payload.todolists.map(m => ({...m, filter: "all", todoStatus: "idle"}));
        }
        case TodolistActions.DISABLE_TODOLIST: {
            return state.map(m => m.id === action.payload.todolistId ? {...m, todoStatus: "loading"} : m);
        }
        default:
            return state;
    }
}

// AC
export const deleteTodolistAC = (todolistId: string) => {
    return {
        type: TodolistActions.REMOVE_TODOLIST,
        payload: {todolistId}
    } as const;
}
export const addTodolistAC = (todolist: TodoType) => {
    return {
        type: TodolistActions.ADD_TODOLIST,
        payload: {todolist}
    } as const;
}
export const renameTodolistAC = (todolistId: string, newTitle: string) => {
    return {
        type: TodolistActions.RENAME_TODOLIST,
        payload: {todolistId, newTitle}
    } as const;
}
export const setTodolistsAC = (todolists: TodoType[]) => {
    return {
        type: TodolistActions.SET_TODOLISTS,
        payload: {todolists}
    } as const;
}
export const disableButton = (todolistId: string, value: ErrorsStatusType) => {
    return {
        type: TodolistActions.DISABLE_TODOLIST,
        payload: {todolistId, value}
    } as const;
}

// TC
export const removeTodolist = (todolistId: string): AppThunkType => async (dispatch) => {
    try {
        dispatch(setLoadingBar("loading"));
        dispatch(disableButton(todolistId, "loading"));
        await todolistsAPI.deleteTodolist(todolistId);
        dispatch(deleteTodolistAC(todolistId));
    } catch (err: any) {
        dispatch(setError(err.message));
    } finally {
        dispatch(setLoadingBar("finished"));
        dispatch(disableButton(todolistId, "finished"));
    }
}
export const addTodolist = (title: string): AppThunkType => async (dispatch) => {
    try {
        const response = await todolistsAPI.createTodolist(title);
        if (response.data.messages.length > 0) {
            const error = response.data.messages[0];
            dispatch(setError(error));
            return;
        }
        const todolist = response.data.data.item;
        dispatch(addTodolistAC(todolist));
    } catch (err: any) {
        dispatch(setError(err.message));
    }
}
export const renameTodolist = (todolistId: string, title: string): AppThunkType => async (dispatch) => {
    try {
        dispatch(setLoadingBar("loading"));
        await todolistsAPI.updateTodolist(todolistId, title);
        dispatch(renameTodolistAC(todolistId, title));
    } catch (err: any) {
        dispatch(setError(err.message));
    } finally {
        dispatch(setLoadingBar("finished"));
    }
}
export const setTodolists = (): AppThunkType => async (dispatch) => {
    try {
        dispatch(setLoadingBar("loading"));
        const response = await todolistsAPI.getTodolists();
        dispatch(setTodolistsAC(response.data));
    } catch (err) {
        throw new Error("error on getting todolists");
    } finally {
        dispatch(setLoadingBar("finished"));
    }
}

//types
export type TodolistsActionType =
    DeleteTodolistType
    | AddTodolistType
    | RenameTodolistType
    | SetTodolistsType
    | DisableButtonType;
export type DeleteTodolistType = ReturnType<typeof deleteTodolistAC>
export type AddTodolistType = ReturnType<typeof addTodolistAC>
export type SetTodolistsType = ReturnType<typeof setTodolistsAC>
type RenameTodolistType = ReturnType<typeof renameTodolistAC>
type DisableButtonType = ReturnType<typeof disableButton>
export type TodolistType = TodoType & {
    filter: FilterType
    todoStatus: ErrorsStatusType
}
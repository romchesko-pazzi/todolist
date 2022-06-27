import {FilterType} from "../App";
import {todolistsAPI, TodoType} from "../api/todolist";
import {AppThunkType} from "./hooks";

export enum TodolistActions {
    SET_TODOLISTS = "SET_TODOLISTS",
    RENAME_TODOLIST = "RENAME_TODOLIST",
    ADD_TODOLIST = "ADD_TODOLIST",
    REMOVE_TODOLIST = "REMOVE_TODOLIST",
}

export type TodolistsActionType = deleteTodolistType | AddTodolistType | RenameTodolistType | SetTodolistsType;
type RenameTodolistType = ReturnType<typeof renameTodolistAC>
export type deleteTodolistType = ReturnType<typeof deleteTodolistAC>
export type AddTodolistType = ReturnType<typeof addTodolistAC>
export type SetTodolistsType = ReturnType<typeof setTodolistsAC>

export type CommonTodoType = TodoType & {
    filter: FilterType
}

const initialState: CommonTodoType[] = [];

export const todolistsReducer = (state: CommonTodoType[] = initialState, action: TodolistsActionType): CommonTodoType[] => {
    switch (action.type) {
        case TodolistActions.REMOVE_TODOLIST: {
            return state.filter(f => f.id !== action.payload.todolistId);
        }
        case TodolistActions.ADD_TODOLIST: {
            return [{...action.payload.todolist, filter: "all"}, ...state];
        }
        case TodolistActions.RENAME_TODOLIST: {
            return state.map(m => m.id === action.payload.todolistId ? {...m, title: action.payload.newTitle} : m);
        }
        case TodolistActions.SET_TODOLISTS: {
            return action.payload.todolists.map(m => ({...m, filter: "all"}));
        }
        default:
            return state;
    }
}

export const deleteTodolistAC = (todolistId: string) => {
    return {
        type: TodolistActions.REMOVE_TODOLIST,
        payload: {todolistId}
    } as const
}

export const addTodolistAC = (todolist: TodoType) => {
    return {
        type: TodolistActions.ADD_TODOLIST,
        payload: {todolist}
    } as const
}

export const renameTodolistAC = (todolistId: string, newTitle: string) => {
    return {
        type: TodolistActions.RENAME_TODOLIST,
        payload: {todolistId, newTitle}
    } as const
}

export const setTodolistsAC = (todolists: TodoType[]) => {
    return {
        type: TodolistActions.SET_TODOLISTS,
        payload: {todolists}
    } as const
}

export const setTodolists = (): AppThunkType => async (dispatch) => {
    const response = await todolistsAPI.getTodolists();
    dispatch(setTodolistsAC(response.data))
}

export const addTodolist = (title: string): AppThunkType => async (dispatch) => {
    const response = await todolistsAPI.createTodolist(title);
    const todolist = response.data.data.item;
    dispatch(addTodolistAC(todolist));
}

export const removeTodolist = (todolistId: string): AppThunkType => async (dispatch) => {
    await todolistsAPI.deleteTodolist(todolistId);
    dispatch(deleteTodolistAC(todolistId));
}

export const renameTodolist = (todolistId: string, title: string): AppThunkType => async (dispatch) => {
    await todolistsAPI.updateTodolist(todolistId, title);
    dispatch(renameTodolistAC(todolistId, title));
}
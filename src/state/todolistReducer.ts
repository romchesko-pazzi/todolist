import {FilterType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";

type ActionType = RemoveTodolistType | AddTodolistType | ChangeTodolistFilterType | RenameTodolistType;
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export type AddTodolistType = ReturnType<typeof addTodolistAC>
type ChangeTodolistFilterType = ReturnType<typeof changeTodolistFilterAC>
type RenameTodolistType = ReturnType<typeof renameTodolistAC>

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(f => f.id !== action.payload.todolistID)
        }
        case "ADD-TODOLIST": {
            return [{id: action.payload.todolistID, title: action.payload.newTitle, filter: "all"}, ...state]
        }
        case "RENAME-TODOLIST": {
            return state.map(m => m.id === action.payload.todolistID ? {...m, title: action.payload.newTitle} : m);
        }
        case "CHANGE-TASKS-FILTER":{
            return state.map(m => m.id === action.payload.todolistID ? {...m, filter: action.payload.newFilter} : m);
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todolistID: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {todolistID}
    } as const
}

export const addTodolistAC = (newTitle: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {newTitle, todolistID: v1()}
    } as const
}

export const renameTodolistAC = (todolistID: string, newTitle: string) => {
    return {
        type: "RENAME-TODOLIST",
        payload: {todolistID, newTitle}
    } as const
}

export const changeTodolistFilterAC = (todolistID: string, newFilter: FilterType) => {
    return {
        type: "CHANGE-TASKS-FILTER",
        payload: {todolistID, newFilter}
    } as const
}
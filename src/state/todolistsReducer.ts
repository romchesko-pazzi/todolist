import {FilterType} from "../App";
import {v1} from "uuid";
import {TodoType} from "../api/todolist";
import {TaskStatuses} from "../api/tasks";

type ActionType = RemoveTodolistType | AddTodolistType | RenameTodolistType;
type RenameTodolistType = ReturnType<typeof renameTodolistAC>
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export type AddTodolistType = ReturnType<typeof addTodolistAC>

export type CommonTodoType = TodoType & {
    filter: FilterType
}

const initialState: CommonTodoType[] = [];

export const todolistsReducer = (state: CommonTodoType[] = initialState, action: ActionType): CommonTodoType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(f => f.id !== action.payload.todolistID);
        }
        case "ADD-TODOLIST": {
            return [
                {
                    id: action.payload.todolistID,
                    title: action.payload.newTitle,
                    filter: "all",
                    addedDate: "",
                    order: TaskStatuses.New
                }, ...state];
        }
        case "RENAME-TODOLIST": {
            return state.map(m => m.id === action.payload.todolistID ? {...m, title: action.payload.newTitle} : m);
        }
        default:
            return state;
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
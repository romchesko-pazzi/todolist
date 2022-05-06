import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistType, RemoveTodolistType, todolistID1, todolistID2} from "./todolistsReducer";

type ActionType =
    RemoveTaskAC
    | AddTaskAC
    | ChangeTaskStatusAC
    | RenameTaskAC
    | AddTodolistType
    | RemoveTodolistType;
type RemoveTaskAC = ReturnType<typeof removeTaskAC>
type AddTaskAC = ReturnType<typeof addTaskAC>
type ChangeTaskStatusAC = ReturnType<typeof changeTaskStatusAC>
type RenameTaskAC = ReturnType<typeof renameTaskAC>


const initialState: TasksStateType = {
    [todolistID1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todolistID2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "Flour", isDone: true},
        {id: v1(), title: "Meat", isDone: false},
        {id: v1(), title: "Carrots", isDone: false},
        {id: v1(), title: "Water", isDone: false},
    ],
}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].filter(f => f.id !== action.payload.taskID)
            }
        }
        case "ADD-TASK": {
            let newTask = {id: v1(), title: action.payload.newTitle, isDone: false}
            return {...state, [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]]}
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(m => m.id === action.payload.taskID ? {
                    ...m,
                    isDone: action.payload.newStatus
                } : m)
            };
        }
        case "RENAME-TASK": {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(m => m.id === action.payload.taskID ? {
                    ...m,
                    title: action.payload.newTitle
                } : m)
            };
        }
        case "ADD-TODOLIST": {
            return {...state, [action.payload.todolistID]: []}
        }
        case "REMOVE-TODOLIST": {
            const copy = {...state}
            delete copy[action.payload.todolistID];
            return copy;
        }
        default:
            return state
    }
}

export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {todolistID, taskID}
    } as const
}

export const addTaskAC = (todolistID: string, newTitle: string) => {
    return {
        type: "ADD-TASK",
        payload: {todolistID, newTitle}
    } as const
}

export const changeTaskStatusAC = (todolistID: string, newStatus: boolean, taskID: string) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {todolistID, taskID, newStatus}
    } as const
}

export const renameTaskAC = (todolistID: string, newTitle: string, taskID: string) => {
    return {
        type: "RENAME-TASK",
        payload: {todolistID, taskID, newTitle}
    } as const
}

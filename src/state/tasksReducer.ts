import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistType, RemoveTodolistType} from "./todolistsReducer";
import {TaskPriority, TaskStatuses} from "../api/tasks";

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


const initialState: TasksStateType = {}


export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].filter(f => f.id !== action.payload.taskID)
            }
        }
        case "ADD-TASK": {
            let newTask =
                {
                    id: v1(),
                    title: action.payload.newTitle,
                    description: "",
                    todoListId: action.payload.todolistID,
                    order: 0,
                    status: TaskStatuses.New,
                    priority: TaskPriority.Low,
                    startDate: "",
                    deadline: "",
                    addedDate: "",
                }
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

export const changeTaskStatusAC = (todolistID: string, newStatus: TaskStatuses, taskID: string) => {
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

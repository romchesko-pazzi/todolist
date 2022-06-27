import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistType, deleteTodolistType, SetTodolistsType, TodolistActions} from "./todolistsReducer";
import {TaskPriority, tasksAPI, TaskStatuses, TaskType} from "../api/tasks";
import {AppThunkType} from "./hooks";

enum TasksActions {
    SET_TASKS = "SET_TASKS",
    RENAME_TASK = "RENAME_TASK",
    ADD_TASK = "ADD_TASK",
    DELETE_TASK = "DELETE_TASK",
    UPDATE_TASK = "UPDATE_TASK",
}

export type TasksActionType =
    RemoveTaskType
    | AddTaskType
    | ChangeTaskStatusType
    | RenameTaskType
    | AddTodolistType
    | deleteTodolistType
    | SetTodolistsType
    | SetTasksType;
type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
type RenameTaskType = ReturnType<typeof renameTaskAC>
type SetTasksType = ReturnType<typeof setTasksAC>


const initialState: TasksStateType = {}


export const tasksReducer = (state = initialState, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case TasksActions.DELETE_TASK: {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(f => f.id !== action.payload.taskID)
            }
        }
        case TasksActions.ADD_TASK: {
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
            }
        }
        case TasksActions.UPDATE_TASK: {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(m => m.id === action.payload.taskID ? {
                    ...m,
                    status: action.payload.newStatus
                } : m)
            };
        }
        case TasksActions.RENAME_TASK: {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(m => m.id === action.payload.taskID ? {
                    ...m,
                    title: action.payload.newTitle
                } : m)
            };
        }
        case TodolistActions.ADD_TODOLIST: {
            return {...state, [action.payload.todolist.id]: []}
        }
        case TodolistActions.REMOVE_TODOLIST: {
            const copy = {...state}
            delete copy[action.payload.todolistId];
            return copy;
        }
        case TodolistActions.SET_TODOLISTS: {
            const copy = {...state};
            action.payload.todolists.forEach(todolist => {
                copy[todolist.id] = []
            })
            return copy;
        }
        case TasksActions.SET_TASKS: {
            return {...state, [action.payload.todolistId]: action.payload.tasks}
        }
        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, taskID: string) => {
    return {
        type: TasksActions.DELETE_TASK,
        payload: {todolistId, taskID}
    } as const
}
export const removeTask = (todolistId: string, taskId: string): AppThunkType => async (dispatch) => {
    await tasksAPI.deleteTask(todolistId, taskId);
    dispatch(removeTask(todolistId, taskId));
}


export const addTaskAC = (task: TaskType) => {
    return {
        type: TasksActions.ADD_TASK,
        payload: {task}
    } as const
}
export const addNewTask = (title: string, todolistId: string): AppThunkType => async (dispatch) => {
    const response = await tasksAPI.createTask(todolistId, title);
    const task = response.data.data.item
    dispatch(addTaskAC(task));
}

export const changeTaskStatusAC = (todolistId: string, newStatus: TaskStatuses, taskID: string) => {
    return {
        type: TasksActions.UPDATE_TASK,
        payload: {todolistId, taskID, newStatus}
    } as const
}

export const renameTaskAC = (todolistId: string, newTitle: string, taskID: string) => {
    return {
        type: TasksActions.RENAME_TASK,
        payload: {todolistId, taskID, newTitle}
    } as const
}

const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {
        type: TasksActions.SET_TASKS,
        payload: {todolistId, tasks}
    } as const
}
export const setTasks = (todolistId: string): AppThunkType => async (dispatch) => {
    const response = await tasksAPI.getTasks(todolistId);
    dispatch(setTasksAC(todolistId, response.data.items));
}



import {AddTodolistType, DeleteTodolistType, SetTodolistsType, TodolistActions} from "./todolistsReducer";
import {ResponseTaskType, tasksAPI, UpdateBody} from "../api/tasks";
import {AppThunkType} from "./hooks";
import {ErrorsStatusType, setError, setLoadingBar} from "./appReducer";

enum TasksActions {
    SET_TASKS = "TASKS/SET_TASKS",
    ADD_TASK = "TASKS/ADD_TASK",
    DELETE_TASK = "TASKS/DELETE_TASK",
    UPDATE_TASK = "TASKS/UPDATE_TASK",
    DISABLE_BTN = "TASKS/DISABLE_BUTTON",
}

const initialState: TaskType = {}

export const TasksReducer = (state = initialState, action: TasksActionType): TaskType => {
    switch (action.type) {
        case TasksActions.DELETE_TASK: {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(f => f.id !== action.payload.taskId)
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
                [action.payload.todolistId]: state[action.payload.todolistId].map(m => m.id === action.payload.taskId ? {
                    ...m, ...action.payload.task
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
        case TasksActions.DISABLE_BTN: {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(m => m.id === action.payload.taskId ? {
                    ...m,
                    taskStatus: action.payload.value
                } : m)
            }
        }
        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: TasksActions.DELETE_TASK,
        payload: {todolistId, taskId}
    } as const
}
export const addTaskAC = (task: ResponseTaskType) => {
    return {
        type: TasksActions.ADD_TASK,
        payload: {task}
    } as const
}
export const updateTaskAC = (todolistId: string, task: UpdateBody, taskId: string) => {
    return {
        type: TasksActions.UPDATE_TASK,
        payload: {todolistId, taskId, task}
    } as const
}
const setTasksAC = (todolistId: string, tasks: ResponseTaskType[]) => {
    return {
        type: TasksActions.SET_TASKS,
        payload: {todolistId, tasks}
    } as const
}
const disableDeleteButton = (todolistId: string, taskId: string, value: ErrorsStatusType) => {
    return {
        type: TasksActions.DISABLE_BTN,
        payload: {todolistId, taskId, value}
    } as const
}

// TC
export const removeTask = (todolistId: string, taskId: string): AppThunkType => async (dispatch) => {
    try {
        dispatch(disableDeleteButton(todolistId, taskId, "loading"))
        dispatch(setLoadingBar("loading"));
        await tasksAPI.deleteTask(todolistId, taskId);
        dispatch(removeTaskAC(todolistId, taskId));
    } catch (err: any) {
        dispatch(setError(err.message))
    } finally {
        dispatch(setLoadingBar("finished"));
    }
}
export const addNewTask = (title: string, todolistId: string): AppThunkType => async (dispatch) => {
    try {
        dispatch(setLoadingBar("loading"));
        const response = await tasksAPI.createTask(todolistId, title);
        if (response.data.messages.length > 0) {
            const error = response.data.messages[0];
            dispatch(setError(error))
            return
        }
        const task = response.data.data.item
        dispatch(addTaskAC(task));
    } catch (err: any) {
        dispatch(setError(err.message));
    } finally {
        dispatch(setLoadingBar("finished"));
    }
}
export const updateTask = (task: ResponseTaskType): AppThunkType => async (dispatch) => {
    if (!task) return;
    const body: UpdateBody = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
    }
    try {
        await tasksAPI.renameTask(task.todoListId, task.id, body);
        dispatch(updateTaskAC(task.todoListId, body, task.id));
    } catch (err: any) {
        dispatch(setError(err.message))
    }

};
export const setTasks = (todolistId: string): AppThunkType => async (dispatch) => {
    try {
        dispatch(setLoadingBar("loading"));
        const response = await tasksAPI.getTasks(todolistId);
        dispatch(setTasksAC(todolistId, response.data.items));
    } catch (err) {
        throw new Error("error on getting tasks");
    } finally {
        dispatch(setLoadingBar("finished"));

    }
}

// types
export type TasksActionType =
    RemoveTaskType
    | AddTaskType
    | UpdateTaskType
    | AddTodolistType
    | DeleteTodolistType
    | SetTodolistsType
    | SetTasksType
    | DisableDeleteButtonType;
type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
type UpdateTaskType = ReturnType<typeof updateTaskAC>
type SetTasksType = ReturnType<typeof setTasksAC>
type DisableDeleteButtonType = ReturnType<typeof disableDeleteButton>

export type TaskType = {
    [key: string]: ResponseTaskType[]
}
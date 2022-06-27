import {TasksStateType} from "../App";
import {AddTodolistType, deleteTodolistType, SetTodolistsType, TodolistActions} from "./todolistsReducer";
import {tasksAPI, TaskType, UpdateBody} from "../api/tasks";
import {AppThunkType} from "./hooks";

enum TasksActions {
    SET_TASKS = "SET_TASKS",
    ADD_TASK = "ADD_TASK",
    DELETE_TASK = "DELETE_TASK",
    UPDATE_TASK = "UPDATE_TASK",
}

export type TasksActionType =
    RemoveTaskType
    | AddTaskType
    | UpdateTaskType
    | AddTodolistType
    | deleteTodolistType
    | SetTodolistsType
    | SetTasksType;
type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
type UpdateTaskType = ReturnType<typeof updateTaskAC>
type SetTasksType = ReturnType<typeof setTasksAC>


const initialState: TasksStateType = {}


export const tasksReducer = (state = initialState, action: TasksActionType): TasksStateType => {
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
                    ...m,
                    title: action.payload.task.title,
                    status: action.payload.task.status,
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

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: TasksActions.DELETE_TASK,
        payload: {todolistId, taskId}
    } as const
}
export const addTaskAC = (task: TaskType) => {
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
const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {
        type: TasksActions.SET_TASKS,
        payload: {todolistId, tasks}
    } as const
}


export const removeTask = (todolistId: string, taskId: string): AppThunkType => async (dispatch) => {
    try {
        await tasksAPI.deleteTask(todolistId, taskId);
        dispatch(removeTaskAC(todolistId, taskId));
    } catch (err) {
        console.log(err)
    }
}
export const addNewTask = (title: string, todolistId: string): AppThunkType => async (dispatch) => {
    const response = await tasksAPI.createTask(todolistId, title);
    const task = response.data.data.item
    dispatch(addTaskAC(task));
}
export const updateTask = (task: TaskType): AppThunkType => {
    return async (dispatch) => {
        if (!task) return;
        const body: UpdateBody = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
        }
        await tasksAPI.renameTask(task.todoListId, task.id, body);
        dispatch(updateTaskAC(task.todoListId, body, task.id));
    };
}
export const setTasks = (todolistId: string): AppThunkType => async (dispatch) => {
    const response = await tasksAPI.getTasks(todolistId);
    dispatch(setTasksAC(todolistId, response.data.items));
}
import {CommonType, DataType, instance} from "./todolist";
import {AxiosResponse} from "axios";

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft,
}

export enum TaskPriority {
    Low,
    Middle,
    Hi,
    Urgently,
    Later,
}

export type TaskType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: TaskStatuses
    priority: number
    startDate: string
    deadline: string
    addedDate: string
}
export type UpdateBody = {
    title: string
    description: string
    status: TaskStatuses
    priority: number
    startDate: string
    deadline: string
}

type GetType = {
    items: TaskType[]
    totalCount: number
    error: string | null
}

export const tasksAPI = {
    getTasks(todolistId: string): Promise<AxiosResponse<GetType>> {
        return instance.get<GetType>(`${todolistId}/tasks`);
    },
    createTask(todolistId: string, title: string): Promise<AxiosResponse<CommonType<DataType<TaskType>>>> {
        return instance.post<CommonType<DataType<TaskType>>>(`${todolistId}/tasks`, {title});
    },
    deleteTask(todolistId: string, taskId: string): Promise<AxiosResponse<CommonType>> {
        return instance.delete<CommonType>(`${todolistId}/tasks/${taskId}`);
    },
    renameTask(todolistId: string, taskId: string, body: UpdateBody): Promise<AxiosResponse<CommonType<DataType<TaskType>>>> {
        return instance.put<CommonType<DataType<TaskType>>>(`${todolistId}/tasks/${taskId}`, body);
    }
}
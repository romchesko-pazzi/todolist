import {CommonType, DataType, instance} from "./todolist";
import {AxiosResponse} from "axios";
import {ErrorsStatusType} from "../state/appReducer";

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

export type ResponseTaskType = {
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
    taskStatus?: ErrorsStatusType
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
    items: ResponseTaskType[]
    totalCount: number
    error: string | null
}

export const tasksAPI = {
    getTasks(todolistId: string): Promise<AxiosResponse<GetType>> {
        return instance.get<GetType>(`${todolistId}/tasks`);
    },
    createTask(todolistId: string, title: string): Promise<AxiosResponse<CommonType<DataType<ResponseTaskType>>>> {
        return instance.post<CommonType<DataType<ResponseTaskType>>>(`${todolistId}/tasks`, {title});
    },
    deleteTask(todolistId: string, taskId: string): Promise<AxiosResponse<CommonType>> {
        return instance.delete<CommonType>(`${todolistId}/tasks/${taskId}`);
    },
    renameTask(todolistId: string, taskId: string, body: UpdateBody): Promise<AxiosResponse<CommonType<DataType<ResponseTaskType>>>> {
        return instance.put<CommonType<DataType<ResponseTaskType>>>(`${todolistId}/tasks/${taskId}`, body);
    }
}
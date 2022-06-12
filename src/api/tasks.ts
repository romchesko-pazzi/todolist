import {CommonType, DataType, instance} from "./todolist";
import {AxiosResponse} from "axios";

type ItemType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: number
    priority: number
    startDate: Date
    deadline: Date
    addedDate: string
}

type UpdateBody = {
    title: string
    description: string
    status: number
    priority: number
    startDate: Date
    deadline: Date
}

type GetType = {
    items: ItemType[]
    totalCount: number
    error: string | null
}

export const tasksAPI = {
    getTasks(todolistId: string): Promise<AxiosResponse<GetType>> {
        return instance.get<GetType>(`${todolistId}/tasks`);
    },
    createTask(todolistId: string, title: string): Promise<AxiosResponse<CommonType<DataType>>> {
        return instance.post<CommonType<DataType<ItemType>>>(`${todolistId}/tasks`, {title});
    },
    deleteTask(todolistId: string, taskId: string): Promise<AxiosResponse<CommonType>> {
        return instance.delete<CommonType>(`${todolistId}/tasks/${taskId}`);
    },
    renameTask(todolistId: string, taskId: string, body: UpdateBody): Promise<AxiosResponse<CommonType<DataType<ItemType>>>> {
        return instance.put<CommonType<DataType<ItemType>>>(`${todolistId}/tasks/${taskId}`, body);
    }
}
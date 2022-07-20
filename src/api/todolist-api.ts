import axios, {AxiosResponse} from "axios";
import {API_KEY} from "./api-key";

export type TodoType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type DataType<T = {}> = {
    item: T
}

export type CommonType<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors?: string[]
    data: T
}

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": API_KEY
    },
})

export const todolistsAPI = {
    getTodolists(): Promise<AxiosResponse<TodoType[]>> {
        return instance.get<TodoType[]>("todo-lists");
    },
    createTodolist(title: string): Promise<AxiosResponse<CommonType<DataType<TodoType>>>> {
        return instance.post<CommonType<DataType<TodoType>>>("todo-lists", {title});
    },
    deleteTodolist(todolistId: string): Promise<AxiosResponse<CommonType>> {
        return instance.delete<CommonType>(`todo-lists/${todolistId}`);
    },
    updateTodolist(todolistId: string, title: string): Promise<AxiosResponse<CommonType>> {
        return instance.put<CommonType>(`todo-lists/${todolistId}`, {title});
    },
}



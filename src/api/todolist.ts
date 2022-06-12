import axios, {AxiosResponse} from "axios";

type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
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
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists/",
    withCredentials: true,
    headers: {
        "API-KEY": "b586ccec-80f3-4fec-93a0-9cb544188701"
    }
})

export const todolistsAPI = {
    getTodolists(): Promise<AxiosResponse<TodoType[]>> {
        return instance.get<TodoType[]>("");
    },
    createTodolist(title: string): Promise<AxiosResponse<CommonType<DataType>>> {
        return instance.post<CommonType<DataType<TodoType>>>("", {title});
    },
    deleteTodolist(todolistId: string): Promise<AxiosResponse<CommonType>> {
        return instance.delete<CommonType>(`${todolistId}`);
    },
    updateTodolist(todolistId: string, title: string): Promise<AxiosResponse<CommonType>> {
        return instance.put<CommonType>(`${todolistId}`, {title});
    },
}



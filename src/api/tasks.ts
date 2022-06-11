import {instance} from "./todolist";
import {AxiosResponse} from "axios";

type ItemType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetType = {
    items: ItemType[]
    totalCount: number
    error?: string
}

type DataType = {
    item: ItemType
}

type CommonType<T = {}> = {
    messages: []
    resultCode: number
    data: T
    fieldsErrors?: []
}


export const tasksAPI = {
    getTasks(todolistId: string): Promise<AxiosResponse<GetType>> {
        return instance.get<GetType>(`${todolistId}/tasks`);
    },
    createTask(todolistId: string, title: string): Promise<AxiosResponse<CommonType<DataType>>> {
        return instance.post<CommonType<DataType>>(`${todolistId}/tasks`, {title});
    },
    deleteTask(todolistId: string, taskId: string): Promise<AxiosResponse<CommonType>> {
        return instance.delete<CommonType>(`${todolistId}/tasks/${taskId}`);
    },
    renameTask(todolistId: string, taskId: string): Promise<AxiosResponse<CommonType>> {

        const body = {
            title: "Kotlin",
            description: "KOTLINGGGGGGGGGGGGG",
            completed: false,
            status: 1111111111,
            priority: 11111111111,
            startDate: new Date(),
            deadline: new Date(),
        }

        return instance.put<CommonType>(`${todolistId}/tasks/${taskId}`, body);
    }
}
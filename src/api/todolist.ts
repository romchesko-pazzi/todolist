import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists/",
    withCredentials: true,
    headers: {
        "API-KEY": "b586ccec-80f3-4fec-93a0-9cb544188701"
    }
})

export const API = {
    getTodolists() {
        return instance.get<TodoType[]>("");
    },
    createTodolist(title: string) {
        return instance.post<CommonType<DataType<TodoType>>>("", {title});
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<CommonType<{}>>(`${todolistId}`);
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<CommonType<{}>>(`${todolistId}`, {title});
    },
}

type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type DataType<T> = {
    item: T
}

type CommonType<T> = {
    resultCode: number
    messages: string[]
    fieldsErrors?: string[]
    data: T
}

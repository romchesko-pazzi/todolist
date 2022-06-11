import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "b586ccec-80f3-4fec-93a0-9cb544188701"
    }
})

export const API = {
    getTodolists() {
        return instance.get("https://social-network.samuraijs.com/api/1.1/todo-lists");
    },
    createTodolist(title:string) {
        return instance.post("https://social-network.samuraijs.com/api/1.1/todo-lists", {title});
    },
    deleteTodolist(todolistId: string) {
        return instance.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`);
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title})
    },
}
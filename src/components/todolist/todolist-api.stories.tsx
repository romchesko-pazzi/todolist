import React, {useEffect, useState} from 'react'
import {API} from "../../api/todolist";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        API.getTodolists()
            .then(res => {
                setState(res.data);
            })
            .catch(rej => {
                console.log(rej);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    const title = "123";

    useEffect(() => {
        API.createTodolist(title)
            .then(res => {
                setState(res.data)
            })
            .catch(console.log);
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    let todolistId = "a6c45828-cf2c-4e2c-8b53-bbe6c6bed37c";

    useEffect(() => {
        API.deleteTodolist(todolistId)
            .catch(console.log);
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    let todolistId = "8b74a94a-a600-4631-bf5c-2f88de6a55b5";
    let title = "VueJS";

    useEffect(() => {
        API.updateTodolist(todolistId,title)
            .catch(console.log);
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
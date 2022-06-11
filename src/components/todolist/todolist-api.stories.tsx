import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../../api/todolist";

export default {
    title: 'todolists-API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then(res => {
                setState(res.data.map(m => m.title));
            })
            .catch(rej => {
                console.log(rej);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    const title = "ffffffff";

    useEffect(() => {
        todolistsAPI.createTodolist(title)
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
        todolistsAPI.deleteTodolist(todolistId)
            .catch(console.log);
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    let todolistId = "ecfdcd8b-950b-4ec0-ba72-b203c22293e9";
    let title = "Flutter";

    useEffect(() => {
        todolistsAPI.updateTodolist(todolistId, title)
            .catch(console.log);
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
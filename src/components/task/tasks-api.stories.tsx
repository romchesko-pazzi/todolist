import React, {useEffect, useState} from 'react'
import {tasksAPI} from "../../api/tasks";

export default {
    title: 'tasks-API'
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null);

    const todolistId = "ecfdcd8b-950b-4ec0-ba72-b203c22293e9";

    useEffect(() => {
        tasksAPI.getTasks(todolistId)
            .then(res => {
                setState(res.data.items);
            })
            .catch(rej => {
                console.log(rej)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>

}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null);

    const title = "LearnJS";
    const todolistId = "ecfdcd8b-950b-4ec0-ba72-b203c22293e9";

    useEffect(() => {
        tasksAPI.createTask(todolistId, title)
            .then(res => {
                setState(res.data.data);
            })
            .catch(rej => {
                console.log(rej)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>

}

export const DeleteTask = () => {

    const taskId = "6f89a8f0-0944-439e-9fa4-892ae6c5ffc6";
    const todolistId = "ecfdcd8b-950b-4ec0-ba72-b203c22293e9";

    useEffect(() => {
        tasksAPI.deleteTask(todolistId, taskId)
            .then(res => {

            })
            .catch(rej => {
                console.log(rej)
            })
    }, [])

    return <div>Task {taskId} deleted</div>

}

export const RenameTask = () => {
    const [state, setState] = useState<any>(null);

    const taskId = "11ae28d8-77b6-4411-a784-49955b2f7f98";
    const todolistId = "ecfdcd8b-950b-4ec0-ba72-b203c22293e9";

    useEffect(() => {
        tasksAPI.renameTask(todolistId, taskId)
            .then(res => {
                setState(res.data.data);
            })
            .catch(rej => {
                console.log(rej)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>

}

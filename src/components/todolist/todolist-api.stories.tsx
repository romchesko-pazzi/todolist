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
    const [title, setTodolistTitle] = useState<string>("");

    const createTodolist = () => {
        if (title !== "") {
            todolistsAPI.createTodolist(title)
                .catch(console.log);
        }
        setTodolistTitle("");
    }

    return (
        <div>
            <div>
                <input placeholder={"title"}
                       value={title}
                       onChange={(e) => setTodolistTitle(e.currentTarget.value)}/>
            </div>
            <div>
                <button onClick={createTodolist}>create todolist</button>
            </div>
            <div>todolist {title} has been deleted</div>
        </div>
    );
}

export const DeleteTodolist = () => {
    const [todolistId, setTodolistId] = useState<string>("");

    const deleteTodolist = () => {
        if (todolistId !== "") {
            todolistsAPI.deleteTodolist(todolistId)
                .catch(console.log);
        }
        setTodolistId("");
    }

    return (
        <div>
            <div>
                <input placeholder={"todolistId"}
                       value={todolistId}
                       onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            </div>
            <div>
                <button onClick={deleteTodolist}>delete todolist</button>
            </div>
            <div>todolist {todolistId} has been deleted</div>
        </div>
    );
}

export const UpdateTodolistTitle = () => {
    const [todolistId, setTodolistId] = useState<string>("");
    const [title, setTodolistTitle] = useState<string>("");

    const updateTodolistTitle = () => {
        if (title !== "") {
            todolistsAPI.updateTodolist(todolistId, title)
                .catch(console.log);
        }
        setTodolistTitle("");
    }

    return (
        <div>
            <div>
                <input placeholder={"todolistTitle"}
                       value={title}
                       onChange={(e) => setTodolistTitle(e.currentTarget.value)}/>
            </div>
            <div>
                <input placeholder={"todolistId"}
                       value={todolistId}
                       onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            </div>
            <div>
                <button onClick={updateTodolistTitle}>update todolist title</button>
            </div>
        </div>
    );
}
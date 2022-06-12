import React, {useState} from 'react'
import {tasksAPI} from "../../api/tasks";

export default {
    title: 'tasks-API'
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>("");

    const getTasks = () => {
        if (todolistId !== "") {
            tasksAPI.getTasks(todolistId)
                .then(res => {
                    setState(res.data.items);
                })
                .catch(rej => {
                    console.log(rej)
                })
            setTodolistId("");
        }
    }

    return (
        <div>
            <div>
                <input placeholder={"todolistId"}
                       value={todolistId}
                       onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            </div>
            <div>
                <button onClick={getTasks}>get tasks</button>
            </div>
            {JSON.stringify(state)}
        </div>
    );

}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>("");
    const [taskTitle, setTaskTitle] = useState<string>("");

    const createTask = () => {
        if (todolistId !== "" && taskTitle !== "") {
            tasksAPI.createTask(todolistId, taskTitle)
                .then(res => {
                    setState(res.data.data);
                })
                .catch(rej => {
                    console.log(rej)
                });
        }
        setTaskTitle("");
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
                <input placeholder={"taskTitle"}
                       value={taskTitle}
                       onChange={(e) => setTaskTitle(e.currentTarget.value)}/>
            </div>
            <div>
                <button onClick={createTask}>create task</button>
            </div>
            {JSON.stringify(state)}
        </div>
    );
}

export const DeleteTask = () => {
    const [todolistId, setTodolistId] = useState<string>("");
    const [taskId, setTaskId] = useState<string>("");

    const deleteTask = () => {
        if (todolistId !== "" && taskId !== "") {
            tasksAPI.deleteTask(todolistId, taskId)
                .catch(rej => {
                    console.log(rej)
                })
        }
        setTodolistId("");
        setTaskId("");
    }

    return (
        <div>
            <div>
                <input placeholder={"todolistId"}
                       value={todolistId}
                       onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            </div>
            <div>
                <input placeholder={"taskId"}
                       value={taskId}
                       onChange={(e) => setTaskId(e.currentTarget.value)}/>
            </div>
            <div>
                <button onClick={deleteTask}>delete task</button>
            </div>
            <div>task {taskId} has been deleted</div>
        </div>
    );
}

export const RenameTask = () => {
    const [todolistId, setTodolistId] = useState<string>("");
    const [taskId, setTaskId] = useState<string>("");
    const [newTitle, setNewTitle] = useState<string>("");

    const body = {
        title: newTitle,
        description: "hehe",
        status: 1111111111,
        priority: 11111111111,
        startDate: new Date(),
        deadline: new Date(),
    }

    const renameTask = () => {
        if (todolistId !== "" && taskId !== "") {
            tasksAPI.renameTask(todolistId, taskId, body)
                .then(res => {
                    setNewTitle(res.data.data.item.title);
                })
                .catch(rej => {
                    console.log(rej)
                })
        }
    }

    return (
        <div>
            <div>
                <input placeholder={"todolistId"}
                       value={todolistId}
                       onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            </div>
            <div>
                <input placeholder={"taskId"}
                       value={taskId}
                       onChange={(e) => setTaskId(e.currentTarget.value)}/>
            </div>
            <div>
                <input placeholder={"newTitle"}
                       value={newTitle}
                       onChange={(e) => setNewTitle(e.currentTarget.value)}/>
            </div>
            <div>
                <button onClick={renameTask}>rename task</button>
            </div>
            <div>task {newTitle} has been renamed</div>
        </div>
    );

}

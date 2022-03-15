import React, {useState} from 'react';
import {FilterType} from "./App";
import s from "./Todolist.module.css";
import {AddForm} from "./components/AddForm/AddForm";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import {Button, Checkbox, Grid, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

type PropsType = {
    todolistID: string,
    title: string,
    tasks: Array<TaskType>,
    deleteTask: (todolistID: string, taskID: string) => void,
    addTask: (todolistID: string, newTitle: string) => void,
    changeStatus: (todolistID: string, id: string, value: boolean) => void,
    updateTodolistTitle: (todolistID: string, newTitle: string) => void,
    renameTodolistTask: (todolistID: string, taskID: string, newTitle: string) => void,
}

export const Todolist = (props: PropsType) => {

    const [filter, setFilter] = useState<FilterType>("all");


    let filteredTasks = props.tasks;
    if (filter === "completed") {
        filteredTasks = props.tasks.filter(f => f.isDone);
    } else if (filter === "active") {
        filteredTasks = props.tasks.filter(f => !f.isDone);
    }

    const filterTask = (taskTitle: FilterType) => {
        setFilter(taskTitle);
    }
    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistID, title)
    }
    const deleteHandler = (id: string) => props.deleteTask(props.todolistID, id);
    const filterHandler = (title: FilterType) => filterTask(title);
    const checkedHandler = (todolistID: string, id: string, event: boolean) => {
        props.changeStatus(props.todolistID, id, event);
    }
    const updateTodolistTitleHandler = (newTitle: string) => {
        props.updateTodolistTitle(props.todolistID, newTitle);
    }
    const renameTodolistTaskHandler = (newTitle: string, mID: string) => {
        props.renameTodolistTask(props.todolistID, mID, newTitle);
    }

    return <div>
        <h3><EditableSpan name={props.title} callback={updateTodolistTitleHandler}/></h3>
        <div>
            <AddForm name={"add task"} callback={addTaskHandler}/>
        </div>
        <div>
            {filteredTasks.map(m => {
                return (
                    <div key={m.id} className={m.isDone ? s.isDone : ""}>
                        <Checkbox checked={m.isDone}
                                  onChange={(e) => checkedHandler(props.todolistID, m.id, e.currentTarget.checked)}/>
                        <EditableSpan name={m.title}
                                      callback={(newTitle) => renameTodolistTaskHandler(newTitle, m.id)}/>
                        <IconButton onClick={() => deleteHandler(m.id)}>
                            <Delete/>
                        </IconButton>
                    </div>
                )
            })}
        </div>
        <div>
            <Grid container>
            <Button onClick={() => filterHandler("all")}
                    variant={filter === "all" ? "contained" : "text"}>all</Button>
            <Button onClick={() => filterHandler("active")}
                    color={"secondary"}
                    variant={filter === "active" ? "contained" : "text"}>active</Button>
            <Button onClick={() => filterHandler("completed")}
                    color={"success"}
                    variant={filter === "completed" ? "contained" : "text"}>completed</Button>
            </Grid>
        </div>
    </div>
}
import React, {useCallback, useState} from 'react';
import {FilterType} from "./App";
import {AddForm} from "./components/AddForm/AddForm";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import {Button, Grid, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./components/Task";
import {useDispatch} from "react-redux";
import {removeTaskAC} from "./state/tasksReducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    deleteTask: (todolistID: string, taskID: string) => void
    addTask: (todolistID: string, newTitle: string) => void
    changeStatus: (todolistID: string, id: string, value: boolean) => void
    updateTodolistTitle: (todolistID: string, newTitle: string) => void
    renameTodolistTask: (todolistID: string, taskID: string, newTitle: string) => void
    removeTodolist: (todolistID: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    console.log("todolist");
    const {
        todolistID,
        renameTodolistTask,
        removeTodolist,
        updateTodolistTitle,
        title,
        tasks,
        deleteTask,
        addTask,
        changeStatus
    } = props;



    const [filter, setFilter] = useState<FilterType>("all");

    let filteredTasks = tasks;
    if (filter === "completed") {
        filteredTasks = tasks.filter(f => f.isDone);
    } else if (filter === "active") {
        filteredTasks = tasks.filter(f => !f.isDone);
    }

    const filterTask = useCallback((taskTitle: FilterType) => {
        setFilter(taskTitle);
    }, []);

    const addTaskHandler = useCallback((title: string) => {
        addTask(todolistID, title);
    }, [addTask, todolistID]);

    const deleteHandler = useCallback((id: string) => deleteTask(todolistID, id), [todolistID, deleteTask]);

    const filterHandler = useCallback((title: FilterType) => filterTask(title), [filterTask]);

    const checkedHandler = useCallback((todolistID: string, id: string, event: boolean) => {
        changeStatus(todolistID, id, event);
    }, [changeStatus]);

    const updateTodolistTitleHandler = useCallback((newTitle: string) => {
        updateTodolistTitle(todolistID, newTitle);
    }, [updateTodolistTitle, todolistID]);

    const renameTodolistTaskHandler = useCallback((newTitle: string, mID: string) => {
        renameTodolistTask(todolistID, mID, newTitle);
    }, [todolistID, renameTodolistTask]);

    const removeTodolistHandler = useCallback(() => {
        removeTodolist(todolistID);
    }, [todolistID, removeTodolist]);

    return (
        <div>
            <h3>
                <EditableSpan name={title} callback={updateTodolistTitleHandler}/>
                <IconButton onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <div>
                <AddForm name={"add task"} callback={addTaskHandler}/>
            </div>
            <div>
                {filteredTasks.map(m => {
                    return <Task key={m.id}
                                 task={m}
                                 deleteTask={deleteHandler}
                                 renameTodolistTask={renameTodolistTaskHandler}
                                 changeTaskStatus={checkedHandler}
                                 todolistID={todolistID}/>
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
    )
});
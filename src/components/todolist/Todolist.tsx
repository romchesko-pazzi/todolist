import React, {useCallback, useEffect, useState} from 'react';
import {Button, Grid, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {
    addNewTask,
    addTaskAC,
    changeTaskStatusAC, removeTask,
    removeTaskAC,
    renameTaskAC,
    setTasks
} from "../../state/tasksReducer";
import {EditableSpan} from "../editableSpan/EditableSpan";
import {FilterType, TodolistType} from "../../App";
import {AddForm} from "../addForm/AddForm";
import {Task} from "../task/Task";
import {TaskStatuses} from "../../api/tasks";
import {useAppDispatch, useAppSelector} from "../../state/hooks";
import {removeTodolist, renameTodolist} from "../../state/todolistsReducer";

type PropsType = {
    todolist: TodolistType
}

export const Todolist = React.memo((props: PropsType) => {

    useEffect(() => {
        dispatch(setTasks(todolist.id));
    }, []);

    const {todolist} = props;
    const dispatch = useAppDispatch();
    let tasks = useAppSelector(state => state.tasks[todolist.id]);
    const [filter, setFilter] = useState<FilterType>("all");

    if (filter === "completed") {
        tasks = tasks.filter(f => f.status === TaskStatuses.Completed);
    } else if (filter === "active") {
        tasks = tasks.filter(f => f.status === TaskStatuses.New);
    }

    const filterTask = useCallback((taskTitle: FilterType) => {
        setFilter(taskTitle);
    }, []);

    const addTask = useCallback((newTitle: string) => {
        dispatch(addNewTask(newTitle, todolist.id));
    }, [todolist.id, dispatch]);

    const deleteTask = useCallback((taskId: string) => {
        dispatch(removeTask(todolist.id, taskId))
    }, [todolist.id, dispatch]);

    const changeTaskStatus = useCallback((todolistId: string, id: string, event: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, event ? TaskStatuses.Completed : TaskStatuses.New, id));
    }, [dispatch]);

    const updateTodolistTitle = useCallback((newTitle: string) => {
        dispatch(renameTodolist(todolist.id, newTitle));
    }, [todolist.id, dispatch]);

    const renameTodolistTask = useCallback((newTitle: string, taskID: string) => {
        dispatch(renameTaskAC(todolist.id, newTitle, taskID));
    }, [todolist.id, dispatch]);

    const deleteTodolist = useCallback(() => {
        dispatch(removeTodolist(todolist.id));
    }, [todolist.id, dispatch]);

    return (
        <div>
            <h3>
                <EditableSpan name={todolist.title} callback={updateTodolistTitle}/>
                <IconButton onClick={deleteTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <div>
                <AddForm name={"add task"} callback={addTask}/>
            </div>
            <div>
                {tasks.map(m => {
                    return <Task key={m.id}
                                 task={m}
                                 deleteTask={deleteTask}
                                 renameTodolistTask={renameTodolistTask}
                                 changeTaskStatus={changeTaskStatus}
                                 todolistId={todolist.id}/>
                })}
            </div>
            <div>
                <Grid container>
                    <Button onClick={() => filterTask("all")}
                            variant={filter === "all" ? "contained" : "text"}>all</Button>
                    <Button onClick={() => filterTask("active")}
                            color={"secondary"}
                            variant={filter === "active" ? "contained" : "text"}>active</Button>
                    <Button onClick={() => filterTask("completed")}
                            color={"success"}
                            variant={filter === "completed" ? "contained" : "text"}>completed</Button>
                </Grid>
            </div>
        </div>
    )
});
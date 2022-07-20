import React, {useCallback, useEffect, useState} from 'react';
import {Button, Grid, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {addNewTask, removeTask, setTasks, updateTask} from "../../state/reducers/tasksReducer";
import {EditableSpan} from "../editableSpan/EditableSpan";
import {AddForm} from "../addForm/AddForm";
import {Task} from "../task/Task";
import {TaskStatuses, ResponseTaskType} from "../../api/tasks-api";
import {useAppDispatch, useAppSelector} from "../../state/hooks";
import {removeTodolist, renameTodolist, TodolistType} from "../../state/reducers/todolistsReducer";


export const Todolist = React.memo((props: PropsType) => {

    useEffect(() => {
        dispatch(setTasks(todolist.id));
    }, []);

    const {todolist} = props;
    const dispatch = useAppDispatch();
    let tasks = useAppSelector(state => state.tasks[todolist.id]);
    const todoStatus = todolist.todoStatus;
    // const todoStatus = useAppSelector(state => state.todolists);
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
    const changeTaskStatus = useCallback((task: ResponseTaskType) => {
        dispatch(updateTask(task));
    }, [dispatch]);
    const updateTodolistTitle = useCallback((newTitle: string) => {
        dispatch(renameTodolist(todolist.id, newTitle));
    }, [todolist.id, dispatch]);
    const renameTodolistTask = useCallback((task: ResponseTaskType) => {
        dispatch(updateTask(task));
    }, [dispatch]);
    const deleteTodolist = useCallback(() => {
        dispatch(removeTodolist(todolist.id));
    }, [todolist.id, dispatch]);

    return (
        <div>
            <h3>
                <EditableSpan name={todolist.title} callback={updateTodolistTitle}/>
                <IconButton onClick={deleteTodolist} disabled={todoStatus === "loading"}>
                    <Delete/>
                </IconButton>
            </h3>
            <div>
                <AddForm
                    name={"add task"}
                    callback={addTask}
                    disabled={todoStatus}
                />
            </div>
            <div>
                {tasks.map(m => {
                    return <Task
                        key={m.id}
                        task={m}
                        deleteTask={deleteTask}
                        renameTodolistTask={renameTodolistTask}
                        changeTaskStatus={changeTaskStatus}
                    />
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

// types
export type FilterType = "all" | "active" | "completed" | "";
type PropsType = {
    todolist: TodolistType
}
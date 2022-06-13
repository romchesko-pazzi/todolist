import React, {useCallback, useState} from 'react';
import {Button, Grid, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, renameTaskAC} from "../../state/tasksReducer";
import {EditableSpan} from "../editableSpan/EditableSpan";
import {FilterType, TodolistType} from "../../App";
import {removeTodolistAC, renameTodolistAC} from "../../state/todolistsReducer";
import {RootStateType} from "../../state/store";
import {AddForm} from "../addForm/AddForm";
import {Task} from "../task/Task";
import {TaskStatuses, TaskType} from "../../api/tasks";


type PropsType = {
    todolist: TodolistType
}

export const Todolist = React.memo((props: PropsType) => {
    const {todolist} = props;
    let tasks = useSelector<RootStateType, TaskType[]>(state => state.tasks[todolist.id]);
    const [filter, setFilter] = useState<FilterType>("all");

    const dispatch = useDispatch();


    if (filter === "completed") {
        tasks = tasks.filter(f => f.status === TaskStatuses.Completed);
    } else if (filter === "active") {
        tasks = tasks.filter(f => f.status === TaskStatuses.New);
    }

    const filterTask = useCallback((taskTitle: FilterType) => {
        setFilter(taskTitle);
    }, []);

    const addTask = useCallback((newTitle: string) => {
        dispatch(addTaskAC(todolist.id, newTitle));
    }, [todolist.id, dispatch]);

    const deleteTask = useCallback((taskID: string) => {
        dispatch(removeTaskAC(todolist.id, taskID))
    }, [todolist.id, dispatch]);

    const changeTaskStatus = useCallback((todolistID: string, id: string, event: boolean) => {
        dispatch(changeTaskStatusAC(todolistID, event, id));
    }, [dispatch]);

    const updateTodolistTitle = useCallback((newTitle: string) => {
        dispatch(renameTodolistAC(todolist.id, newTitle));
    }, [todolist.id, dispatch]);

    const renameTodolistTask = useCallback((newTitle: string, taskID: string) => {
        dispatch(renameTaskAC(todolist.id, newTitle, taskID));
    }, [todolist.id, dispatch]);

    const removeTodolist = useCallback(() => {
        dispatch(removeTodolistAC(todolist.id));
    }, [todolist.id, dispatch]);

    return (
        <div>
            <h3>
                <EditableSpan name={todolist.title} callback={updateTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
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
                                 todolistID={todolist.id}/>
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
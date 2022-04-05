import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddForm} from "./components/AddForm/AddForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, renameTaskAC} from "./state/tasksReducer";
import {addTodolistAC, removeTodolistAC, renameTodolistAC} from "./state/todolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./state/store";

export type FilterType = "all" | "active" | "completed" | "";
export type TodolistType = {
    id: string
    title: string
    filter: string
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function App() {

    const dispatch = useDispatch();
    const todolists = useSelector<RootStateType, TodolistType[]>(state => state.todolists);
    const tasks = useSelector<RootStateType, TasksStateType>(state => state.tasks);


    const deleteTask = (todolistID: string, taskID: string) => {
        dispatch(removeTaskAC(todolistID, taskID))
    }

    const addTask = (todolistID: string, newTitle: string) => {
        dispatch(addTaskAC(todolistID, newTitle));
    }

    const changeStatus = (todolistID: string, id: string, value: boolean) => {
        dispatch(changeTaskStatusAC(todolistID, value, id));
    }

    const renameTodolistTask = (todolistID: string, taskID: string, newTitle: string) => {
        dispatch(renameTaskAC(todolistID, newTitle, taskID));
    }

    const addTodoList = (titleOfTodolist: string) => {
        dispatch(addTodolistAC(titleOfTodolist));
    }

    const updateTodolistTitle = (todolistID: string, newTitle: string) => {
        dispatch(renameTodolistAC(todolistID, newTitle));
    }

    const removeTodolist = (todolistID: string) => {
        dispatch(removeTodolistAC(todolistID));
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" sx={{mr: 2}}>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h5" color="inherit" component="div">
                        Todolist
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "15px"}}>
                    <AddForm name={"add todolist"} callback={addTodoList}/>
                </Grid>
                <Grid container spacing={7}>
                    {todolists.map((m, index) => {
                        return (
                            <Grid item>
                                <Paper elevation={4} style={{padding: "20px"}}>
                                    <Todolist
                                        todolistID={m.id}
                                        key={index}
                                        title={m.title}
                                        tasks={tasks[m.id]}
                                        deleteTask={deleteTask}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        updateTodolistTitle={updateTodolistTitle}
                                        renameTodolistTask={renameTodolistTask}
                                        removeTodolist={removeTodolist}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}
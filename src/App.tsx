import React, {useCallback} from 'react';
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
    console.log("APP");

    const dispatch = useDispatch();
    const todolists = useSelector<RootStateType, TodolistType[]>(state => state.todolists);
    const tasks = useSelector<RootStateType, TasksStateType>(state => state.tasks);

    const deleteTask = useCallback((todolistID: string, taskID: string) => {
        dispatch(removeTaskAC(todolistID, taskID))
    }, [dispatch]);

    const addTask = useCallback((todolistID: string, newTitle: string) => {
        dispatch(addTaskAC(todolistID, newTitle));
    }, [dispatch]);

    const changeStatus = useCallback((todolistID: string, id: string, value: boolean) => {
        dispatch(changeTaskStatusAC(todolistID, value, id));
    }, [dispatch]);

    const renameTodolistTask = useCallback((todolistID: string, taskID: string, newTitle: string) => {
        dispatch(renameTaskAC(todolistID, newTitle, taskID));
    }, [dispatch]);

    const addTodoList = useCallback((titleOfTodolist: string) => {
        dispatch(addTodolistAC(titleOfTodolist));
    }, [dispatch]);

    const updateTodolistTitle = useCallback((todolistID: string, newTitle: string) => {
        dispatch(renameTodolistAC(todolistID, newTitle));
    }, [dispatch]);

    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistAC(todolistID));
    }, [dispatch]);

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
                    {todolists.map((m:any) => {
                        return (
                            <Grid item key={m.id}>
                                <Paper elevation={4} style={{padding: "20px"}}>
                                    <Todolist
                                        todolistID={m.id}
                                        key={m.id}
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
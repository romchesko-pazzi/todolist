import React, {useCallback} from 'react';
import './App.css';
import {AddForm} from "./components/addForm/AddForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {addTodolistAC} from "./state/todolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./state/store";
import {TaskType, Todolist} from "./components/todolist/Todolist";

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
    console.log(typeof undefined)

    const dispatch = useDispatch();
    const todolists = useSelector<RootStateType, TodolistType[]>(state => state.todolists);

    const addTodoList = useCallback((titleOfTodolist: string) => {
        dispatch(addTodolistAC(titleOfTodolist));
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
                    {todolists.map((m: TodolistType) => {
                        return (
                            <Grid item key={m.id}>
                                <Paper elevation={4} style={{padding: "20px"}}>
                                    <Todolist
                                        todolist={m}
                                        key={m.id}
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
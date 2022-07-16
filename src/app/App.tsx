import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddForm} from "../components/addForm/AddForm";
import {AppBar, Container, Grid, IconButton, LinearProgress, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {addTodolist, setTodolists, TodolistType} from "../state/todolistsReducer";
import {Todolist} from "../components/todolist/Todolist";
import {useAppDispatch, useAppSelector} from "../state/hooks";
import {ErrorSnackBar} from "../components/errorSnackBar/errorSnackBar";

export const App = () => {

    useEffect(() => {
        dispatch(setTodolists());
    }, []);

    const dispatch = useAppDispatch();
    const todolists = useAppSelector(state => state.todolists);
    const appStatus = useAppSelector(state => state.app.appStatus);
    const addTodoList = useCallback((titleOfTodolist: string) => {
        dispatch(addTodolist(titleOfTodolist));
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
            {appStatus === "loading" && <LinearProgress/>}
            <Container fixed>
                <Grid container style={{padding: "15px"}}>
                    <AddForm
                        name={"add todolist"}
                        callback={addTodoList}
                    />
                </Grid>
                <Grid container spacing={5}>
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
            <ErrorSnackBar/>
        </div>
    );
}

// types
export type FilterType = "all" | "active" | "completed" | "";
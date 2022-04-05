import React, {useReducer, useState} from 'react';
import {v1} from 'uuid';
import './App.css';

import {TaskType, Todolist} from './Todolist';
import {AddForm} from "./components/AddForm/AddForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, renameTaskAC, tasksReducer} from "./state/tasksReducer";
import {addTodolistAC, removeTodolistAC, renameTodolistAC, todolistsReducer} from "./state/todolistsReducer";

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

    let todolistID1 = v1();
    let todolistID2 = v1();
    let todolistID3 = v1();

    let [tasks, tasksDispatch] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Flour", isDone: true},
            {id: v1(), title: "Meat", isDone: false},
            {id: v1(), title: "Carrots", isDone: false},
            {id: v1(), title: "Water", isDone: false},
        ],
    });

    let [todolists, todolistsDispatch] = useReducer(todolistsReducer, [
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"},
    ])


    const deleteTask = (todolistID: string, taskID: string) => {
        tasksDispatch(removeTaskAC(todolistID, taskID));
    }
    const addTask = (todolistID: string, newTitle: string) => {
        tasksDispatch(addTaskAC(todolistID, newTitle));
    }
    const changeStatus = (todolistID: string, id: string, value: boolean) => {
        tasksDispatch(changeTaskStatusAC(todolistID, value, id));
    }
    const renameTodolistTask = (todolistID: string, taskID: string, newTitle: string) => {
        tasksDispatch(renameTaskAC(todolistID, newTitle, taskID));
    }


    const addTodoList = (titleOfTodolist: string) => {

        const action = addTodolistAC(titleOfTodolist);

        todolistsDispatch(action);
        tasksDispatch(action);
    }
    const updateTodolistTitle = (todolistID: string, newTitle: string) => {
        todolistsDispatch(renameTodolistAC(todolistID,newTitle));
    }
    const removeTodolist = (todolistID: string) => {
        // const action = removeTodolistAC(todolistID)

        todolistsDispatch(removeTodolistAC(todolistID));
        tasksDispatch(removeTodolistAC(todolistID));
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
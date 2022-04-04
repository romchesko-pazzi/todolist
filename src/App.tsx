import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';

import {TaskType, Todolist} from './Todolist';
import {AddForm} from "./components/AddForm/AddForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

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

    let [tasks, setTasks] = useState({
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

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"},
    ])


    const deleteTask = (todolistID: string, taskID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(f => f.id !== taskID)})
    }
    const addTask = (todolistID: string, newTitle: string) => {
        let newTask = {id: v1(), title: newTitle, isDone: false};
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]});
    }
    const changeStatus = (todolistID: string, id: string, value: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === id ? {...m, isDone: value} : m)});
    }
    const renameTodolistTask = (todolistID: string, taskID: string, newTitle: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskID ? {...m, title: newTitle} : m)})
    }


    const addTodoList = (titleOfTodolist: string) => {
        let newTodolist = {id: todolistID3, title: titleOfTodolist, filter: "all"};
        setTodolists([newTodolist, ...todolists,]);
        setTasks({...tasks, [todolistID3]: []})
    }
    const updateTodolistTitle = (todolistID: string, newTitle: string) => {
        setTodolists(todolists.map(m => m.id === todolistID ? {...m, title: newTitle} : m));
    }
    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(r => r.id !== todolistID));
        let copyTasks = {...tasks};
        delete copyTasks[todolistID];
        setTasks(copyTasks);
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
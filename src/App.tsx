import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';

import {TaskType, Todolist} from './Todolist';
import {AddForm} from "./components/AddForm/AddForm";

export type FilterType = "all" | "active" | "completed" | "";
export type TodolistType = {
    id: string,
    title: string,
    filter: string
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
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
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
    const addTodoList = (titleOfTodolist: string) => {
        let newTodolist = {id: todolistID3, title: titleOfTodolist, filter: "all"};
        setTodolists([...todolists, newTodolist]);
        setTasks({...tasks, [todolistID3]: []})
    }
    const updateTodolistTitle = (todolistID: string, newTitle: string) => {
        setTodolists(todolists.map(m => m.id === todolistID ? {...m, title: newTitle} : m));
    }
    const renameTodolistTask = (todolistID: string, taskID: string, newTitle: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskID ? {...m, title: newTitle} : m)})
    }
    return (
        <div className="App">
            <AddForm name={"add todolist"} callback={addTodoList}/>
            {todolists.map((m, index) => {
                return (
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
                    />
                )
            })}
        </div>
    );
}
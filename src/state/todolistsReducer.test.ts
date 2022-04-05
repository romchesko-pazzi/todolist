import {v1} from 'uuid';
import {TodolistType} from "../App";
import {
    addTodolistAC,
    removeTodolistAC,
    renameTodolistAC,
    todolistsReducer
} from "./todolistsReducer";

let todolistID1: string;
let todolistID2: string;
let startState: Array<TodolistType> = [];

beforeEach(() => {
    todolistID1 = v1();
    todolistID2 = v1();

    startState = [
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"},
    ]
})


test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolistAC(todolistID1))

    expect(endState.length).toStrictEqual(1);
    expect(endState[0].title).toStrictEqual("What to buy");
    expect(endState[0]).not.toStrictEqual(startState[0]);
});

test('correct todolist should be added', () => {

    const endState = todolistsReducer(startState, addTodolistAC("NEWTODOLIST"))

    expect(endState.length).toStrictEqual(3);
    expect(endState[0].title).toStrictEqual("NEWTODOLIST");
    expect(endState[0].filter).toStrictEqual("all");
    expect(endState[0].id).toBeDefined();
});

test('correct todolist should change its name', () => {

    let newTodolistName = "new name of todolist";

    const action = renameTodolistAC(todolistID2, newTodolistName);
    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toStrictEqual("What to learn");
    expect(endState[1].title).toStrictEqual(newTodolistName);
    expect(endState.length).toStrictEqual(2);
});
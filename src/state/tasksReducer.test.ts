import {v1} from "uuid";
import {TasksStateType} from "../App";
import {
    addTaskAC,
    changeTaskStatusAC,
    removeTaskAC,
    renameTaskAC,
    tasksReducer
} from "./tasksReducer";
import {addTodolistAC, removeTodolistAC} from "./todolistsReducer";

let todolistID1: string;
let todolistID2: string;
let startState: TasksStateType;

beforeEach(() => {
    todolistID1 = v1();
    todolistID2 = v1();

    startState = {
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
    }
})


test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC(todolistID1, startState[todolistID1][1].id);
    const endState = tasksReducer(startState, action);

    expect(endState[todolistID1][1].title).toEqual("ReactJS");
    expect(endState[todolistID1].length).toEqual(4);
    expect(endState[todolistID1]).not.toStrictEqual(startState[todolistID1]);

});

test('correct task should be added to correct array', () => {

    const action = addTaskAC(todolistID2, "Juice");
    const endState = tasksReducer(startState, action);

    expect(endState[todolistID1].length).toEqual(5);
    expect(endState[todolistID2].length).toEqual(6);
    expect(endState[todolistID2][0].title).toEqual("Juice");
    expect(endState[todolistID2]).not.toStrictEqual(startState[todolistID2]);

});

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC(todolistID2, false, startState[todolistID2][1].id);
    const endState = tasksReducer(startState, action);

    expect(endState[todolistID1][1].isDone).toEqual(true);
    expect(endState[todolistID2][1].isDone).toEqual(false);
    expect(endState[todolistID2]).not.toStrictEqual(startState[todolistID2]);

});

test('title of specified task should be changed', () => {


    const action = renameTaskAC(todolistID1, "Typescript", startState[todolistID1][1].id);
    const endState = tasksReducer(startState, action);

    expect(endState[todolistID1][1].title).toEqual("Typescript");
    expect(endState[todolistID2][1].title).toEqual("Flour");
    expect(endState[todolistID1]).not.toStrictEqual(startState[todolistID1]);
});

test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC("new todolist");
    const endState = tasksReducer(startState, action);
    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== todolistID1 && k !== todolistID2);
    if (!newKey) {
        throw Error("new key should be added");
    }

    expect(keys.length).toStrictEqual(3);
    expect(endState[newKey]).toStrictEqual([]);
});

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC(todolistID2);
    const endState = tasksReducer(startState, action);
    const keys = Object.keys(endState);

    expect(keys.length).toStrictEqual(1);
    expect(endState[todolistID2]).toBeUndefined();
});




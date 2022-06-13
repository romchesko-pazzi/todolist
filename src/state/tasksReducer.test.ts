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
import {TaskPriority, TaskStatuses} from "../api/tasks";

let todolistID1: string;
let todolistID2: string;
let startState: TasksStateType;

beforeEach(() => {
    todolistID1 = v1();
    todolistID2 = v1();

    startState = {
        [todolistID1]: [
            {
                id: v1(),
                title: "HTML&CSS",
                description: "",
                todoListId: todolistID1,
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriority.Low,
                startDate: "",
                deadline: "",
                addedDate: "",
            },
            {
                id: v1(),
                title: "GraphQL",
                description: "",
                todoListId: todolistID1,
                order: 0,
                status: TaskStatuses.Completed,
                priority: TaskPriority.Low,
                startDate: "",
                deadline: "",
                addedDate: "",
            },
        ],
        [todolistID2]: [
            {
                id: v1(),
                title: "Milk",
                description: "",
                todoListId: todolistID1,
                order: 0,
                status: TaskStatuses.Completed,
                priority: TaskPriority.Low,
                startDate: "",
                deadline: "",
                addedDate: "",
            },
            {
                id: v1(),
                title: "Water",
                description: "",
                todoListId: todolistID1,
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriority.Low,
                startDate: "",
                deadline: "",
                addedDate: "",
            },
        ],
    }
})


test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC(todolistID1, startState[todolistID1][1].id);
    const endState = tasksReducer(startState, action);

    expect(endState[todolistID1][0].title).toEqual("HTML&CSS");
    expect(endState[todolistID1].length).toEqual(1);
    expect(endState[todolistID1]).not.toStrictEqual(startState[todolistID1]);

});

test('correct task should be added to correct array', () => {

    const action = addTaskAC(todolistID2, "Juice");
    const endState = tasksReducer(startState, action);

    expect(endState[todolistID1].length).toEqual(2);
    expect(endState[todolistID2].length).toEqual(3);
    expect(endState[todolistID2][0].title).toEqual("Juice");
    expect(endState[todolistID2]).not.toStrictEqual(startState[todolistID2]);

});

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC(todolistID2, 0, startState[todolistID2][1].id);
    const endState = tasksReducer(startState, action);

    expect(endState[todolistID1][1].status).toEqual(2);
    expect(endState[todolistID2][1].status).toEqual(0);
    expect(endState[todolistID2]).not.toStrictEqual(startState[todolistID2]);

});

test('title of specified task should be changed', () => {


    const action = renameTaskAC(todolistID1, "Typescript", startState[todolistID1][1].id);
    const endState = tasksReducer(startState, action);

    expect(endState[todolistID1][1].title).toEqual("Typescript");
    expect(endState[todolistID2][1].title).toEqual("Water");
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




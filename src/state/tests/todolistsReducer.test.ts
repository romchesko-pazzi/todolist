import {v1} from 'uuid';
import {addTodolistAC, CommonTodoType, deleteTodolistAC, renameTodolistAC, todolistsReducer} from "../todolistsReducer";

let todolistId1: string;
let todolistId2: string;
let startState: CommonTodoType[] = [];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0},
    ]
})


test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1))

    expect(endState.length).toStrictEqual(1);
    expect(endState[0].title).toStrictEqual("What to buy");
    expect(endState[0]).not.toStrictEqual(startState[0]);
});

test('correct todolist should be added', () => {

    const endState = todolistsReducer(startState, addTodolistAC(startState[0]))

    expect(endState.length).toStrictEqual(3);
    expect(endState[0].title).toStrictEqual("What to learn");
    expect(endState[0].filter).toStrictEqual("all");
    expect(endState[0].id).toBeDefined();
});

test('correct todolist should change its name', () => {

    let newTodolistName = "new name of todolist";

    const action = renameTodolistAC(todolistId2, newTodolistName);
    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toStrictEqual("What to learn");
    expect(endState[1].title).toStrictEqual(newTodolistName);
    expect(endState.length).toStrictEqual(2);
});
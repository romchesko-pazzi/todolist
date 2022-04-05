import {TasksStateType, TodolistType} from "../App";
import {addTodolistAC, todolistsReducer} from "./todolistsReducer";
import {tasksReducer} from "./tasksReducer";

test("id should be similar", () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistType> = [];

    const action = addTodolistAC("newTodolist");

    const endTodolistsState = todolistsReducer(startTodolistsState, action);
    const endTasksState = tasksReducer(startTasksState, action);

    const key = Object.keys(endTasksState);

    expect(key[0]).toStrictEqual(endTodolistsState[0].id);
    expect(endTodolistsState[0].id).toStrictEqual(action.payload.todolistID);
})
import {addTodolistAC, TodolistType, TodolistsReducer} from "../reducers/todolistsReducer";
import {TasksReducer, TaskType} from "../reducers/tasksReducer";
import {v1} from "uuid";

test("id should be similar", () => {
    const startTasksState: TaskType = {};
    const startTodolistsState: TodolistType[] = [];
    const todolist = {id: v1(), title: "What to learn", filter: "all", addedDate: "", order: 0};
    const action = addTodolistAC(todolist);

    const endTodolistsState = TodolistsReducer(startTodolistsState, action);
    const endTasksState = TasksReducer(startTasksState, action);

    const key = Object.keys(endTasksState);

    expect(key[0]).toStrictEqual(endTodolistsState[0].id);
    expect(endTodolistsState[0].id).toStrictEqual(action.payload.todolist.id);
})
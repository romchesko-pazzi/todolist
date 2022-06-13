import {TasksStateType} from "../App";
import {addTodolistAC, CommonTodoType, todolistsReducer} from "./todolistsReducer";
import {tasksReducer} from "./tasksReducer";

test("id should be similar", () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: CommonTodoType[] = [];

    const action = addTodolistAC("newTodolist");

    const endTodolistsState = todolistsReducer(startTodolistsState, action);
    const endTasksState = tasksReducer(startTasksState, action);

    const key = Object.keys(endTasksState);

    expect(key[0]).toStrictEqual(endTodolistsState[0].id);
    expect(endTodolistsState[0].id).toStrictEqual(action.payload.todolistID);
})
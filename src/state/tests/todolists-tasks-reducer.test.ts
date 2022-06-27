import {TasksStateType} from "../../App";
import {addTodolistAC, CommonTodoType, todolistsReducer} from "../todolistsReducer";
import {tasksReducer} from "../tasksReducer";
import {v1} from "uuid";

test("id should be similar", () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: CommonTodoType[] = [];
    const todolist = {id: v1(), title: "What to learn", filter: "all", addedDate: "", order: 0};
    const action = addTodolistAC(todolist);

    const endTodolistsState = todolistsReducer(startTodolistsState, action);
    const endTasksState = tasksReducer(startTasksState, action);

    const key = Object.keys(endTasksState);

    expect(key[0]).toStrictEqual(endTodolistsState[0].id);
    expect(endTodolistsState[0].id).toStrictEqual(action.payload.todolist.id);
})
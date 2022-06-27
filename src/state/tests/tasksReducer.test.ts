import {TasksStateType} from "../../App";
import {addTaskAC, removeTaskAC, tasksReducer, updateTaskAC} from "../tasksReducer";
import {addTodolistAC, deleteTodolistAC} from "../todolistsReducer";
import {TaskPriority, TaskStatuses, UpdateBody} from "../../api/tasks";

let startState: TasksStateType;

beforeEach(() => {

    startState = {
        "todolistId1": [
            {
                id: "1",
                title: "HTML&CSS",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                description: "",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriority.Low,
            },
            {
                id: "2",
                title: "REACT",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                description: "",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriority.Low,
            },
        ],
        "todolistId2": [
            {
                id: "1",
                title: "milk",
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                description: "",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriority.Low,
            },
            {
                id: "2",
                title: "bread",
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                description: "",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriority.Low,
            },
        ],
    }
})


test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("todolistId1", startState["todolistId1"][1].id);
    const endState = tasksReducer(startState, action);

    expect(endState["todolistId1"][0].title).toEqual("HTML&CSS");
    expect(endState["todolistId1"].length).toEqual(1);
    expect(endState["todolistId1"]).not.toStrictEqual(startState["todolistId1"]);

});

test('correct task should be added to correct array', () => {
    const obj = {
        id: "taskID",
        title: "CAT",
        description: "",
        todoListId: "todolistID2",
        order: 0,
        status: TaskStatuses.New,
        priority: TaskPriority.Low,
        startDate: "",
        deadline: "",
        addedDate: "",
    }
    const action = addTaskAC(obj);
    console.log(action)
    const endState = tasksReducer(startState, action);

    expect(endState["todolistId1"].length).toEqual(2);
    expect(endState["todolistId2"].length).toEqual(3);
    expect(endState["todolistId2"][0].id).toEqual("taskID");
    expect(endState["todolistId2"][0].title).toEqual("CAT");
    expect(endState["todolistId2"][0].status).toEqual(TaskStatuses.New);
});

test('status of specified task should be changed', () => {
    const body: UpdateBody = {
        title: "task.title",
        description: "task.description",
        status: TaskStatuses.Completed,
        priority: 0,
        startDate: "task.startDate",
        deadline: "task.deadline",
    }
    const action = updateTaskAC("todolistId2", body, startState["todolistId2"][1].id);
    const endState = tasksReducer(startState, action);

    expect(endState["todolistId2"][1].status).toEqual(TaskStatuses.Completed);
    expect(endState["todolistId1"][1].status).toEqual(TaskStatuses.New);
    expect(endState["todolistId2"]).not.toStrictEqual(startState["todolistId2"]);

});

test('title of specified task should be changed', () => {
    const body: UpdateBody = {
        title: "task.title",
        description: "task.description",
        status: 1,
        priority: 2,
        startDate: "task.startDate",
        deadline: "task.deadline",
    }

    const action = updateTaskAC("todolistId1", body, startState["todolistId1"][0].id);
    const endState = tasksReducer(startState, action);
    console.log(startState["todolistId1"][1].id)

    expect(endState["todolistId1"][0].title).toEqual("task.title");
    expect(endState["todolistId1"][1].title).toEqual("REACT");
    expect(endState["todolistId1"]).not.toStrictEqual(startState["todolistId1"]);
});

test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC(startState["todolistId1"][0]);
    const endState = tasksReducer(startState, action);
    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
    if (!newKey) {
        throw Error("new key should be added");
    }

    expect(keys.length).toStrictEqual(3);
    expect(endState[newKey]).toStrictEqual([]);
});

test('property with todolistId should be deleted', () => {

    const action = deleteTodolistAC("todolistId2");
    const endState = tasksReducer(startState, action);
    const keys = Object.keys(endState);

    expect(keys.length).toStrictEqual(1);
    expect(endState["todolistId2"]).toBeUndefined();
});




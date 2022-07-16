import {App} from "./App";
import {Provider} from "react-redux";
import {rootReducer, RootStateType} from "../state/store";
import {ComponentMeta} from "@storybook/react";
import {createStore} from "redux";
import {v1} from "uuid";
import {TaskPriority, TaskStatuses} from "../api/tasks";

export default {
    title: 'App',
    component: App,
    decorators: [(Story) => (<Provider store={storyBookStore}>{Story()}</Provider>)]
} as ComponentMeta<typeof App>;

export const initialGlobalState = {
    todolists: [
        {
            id: "todolistId1",
            title: "What to learn",
            filter: "all",
            todoStatus: "idle",
            addedDate: "",
            order: 0,
        }
    ],
    tasks: {
        "todolistId1": [
            {
                id: v1(),
                title: "HTML&CSS",
                description: "",
                todoListId: "",
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriority.Low,
                startDate: "",
                deadline: "",
                addedDate: "",
                taskStatus: "idle"
            },
            {
                id: v1(),
                title: "JS",
                description: "",
                todoListId: "",
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriority.Low,
                startDate: "",
                deadline: "",
                addedDate: "",
                taskStatus: "idle"
            }
        ]
    },
    app: {
        appStatus: "idle",
        error: "",
    }
};
export const storyBookStore = createStore(rootReducer, initialGlobalState as RootStateType);
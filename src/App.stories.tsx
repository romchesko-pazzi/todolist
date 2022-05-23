import {App} from "./App";
import {Provider} from "react-redux";
import {rootReducer, RootStateType} from "./state/store";
import {ComponentMeta} from "@storybook/react";
import {createStore} from "redux";
import {v1} from "uuid";

export default {
    title: 'App',
    component: App,
    decorators: [(Story) => (<Provider store={storyBookStore}>{Story()}</Provider>)]
} as ComponentMeta<typeof App>

export const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all"}
    ],
    tasks: {
        "todolistId1": [
            {id: v1(), title: "HTML&CSS", isDone: false},
            {id: v1(), title: "JS", isDone: false}
        ]
    }
};
export const storyBookStore = createStore(rootReducer, initialGlobalState as RootStateType);


export const AppExample = () => {
    return <App/>
}
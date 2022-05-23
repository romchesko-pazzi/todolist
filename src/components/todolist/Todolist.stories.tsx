import {Todolist} from "./Todolist";
import {Provider} from "react-redux";
import {ComponentMeta} from "@storybook/react";
import {createStore} from "redux";
import {rootReducer, RootStateType} from "../../state/store";
import {initialGlobalState} from "../../App.stories";

export default {
    title: 'Todolist',
    component: Todolist,
    decorators: [(Story) => (<Provider store={storyBookStore}>{Story()}</Provider>)]
} as ComponentMeta<typeof Todolist>


export const storyBookStore = createStore(rootReducer, initialGlobalState as RootStateType);

export const TodolistExample = () => {
    return <Todolist todolist={{
        id: storyBookStore.getState().todolists[0].id,
        title: storyBookStore.getState().todolists[0].title,
        filter: storyBookStore.getState().todolists[0].filter,
    }}/>
}
import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolistsReducer";
import {tasksReducer} from "./tasksReducer";
import {devToolsEnhancer} from "redux-devtools-extension";

export type RootStateType = ReturnType<typeof rootReducer>


export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
})

export const store = createStore(rootReducer, devToolsEnhancer({}));
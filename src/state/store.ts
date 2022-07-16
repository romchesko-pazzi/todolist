import {applyMiddleware, combineReducers, createStore} from "redux";
import {TodolistsReducer} from "./todolistsReducer";
import {TasksReducer} from "./tasksReducer";
// import {devToolsEnhancer} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {AppReducer} from "./appReducer";

export type RootStateType = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
    todolists: TodolistsReducer,
    tasks: TasksReducer,
    app: AppReducer
})


// devToolsEnhancer({})
export const store = createStore(rootReducer, applyMiddleware(thunk));
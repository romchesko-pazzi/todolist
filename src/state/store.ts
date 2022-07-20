import {applyMiddleware, combineReducers, createStore} from "redux";
import {TodolistsReducer} from "./reducers/todolistsReducer";
import {TasksReducer} from "./reducers/tasksReducer";
// import {devToolsEnhancer} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {AppReducer} from "./reducers/appReducer";
import {AuthReducer} from "./reducers/authReducer";

export type RootStateType = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
    todolists: TodolistsReducer,
    tasks: TasksReducer,
    app: AppReducer,
    auth: AuthReducer,
})


// devToolsEnhancer({})
export const store = createStore(rootReducer, applyMiddleware(thunk));

//@ts-ignore
window.store = store;
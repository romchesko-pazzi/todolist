import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolistsReducer";
import {tasksReducer} from "./tasksReducer";
// import {devToolsEnhancer} from "redux-devtools-extension";
import thunk from "redux-thunk";

export type RootStateType = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
})


// devToolsEnhancer({})
export const store = createStore(rootReducer, applyMiddleware(thunk));
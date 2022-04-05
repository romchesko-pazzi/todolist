import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolistsReducer";
import {tasksReducer} from "./tasksReducer";


export type RootStateType = ReturnType<typeof rootReducer>


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
})


export const store = createStore(rootReducer);
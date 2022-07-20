import {TodolistsActionType} from "../state/reducers/todolistsReducer";
import {TasksActionType} from "../state/reducers/tasksReducer";
import {AppActionsType} from "../state/reducers/appReducer";
import {AuthActionsType} from "../state/reducers/authReducer";

export type ActionTypeForApp = TodolistsActionType | TasksActionType | AppActionsType | AuthActionsType;
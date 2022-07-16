import {TodolistsActionType} from "../state/todolistsReducer";
import {TasksActionType} from "../state/tasksReducer";
import {AppActionsType} from "../state/appReducer";

export type ActionTypeForApp = TodolistsActionType | TasksActionType | AppActionsType;
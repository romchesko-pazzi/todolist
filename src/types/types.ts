import {TodolistsActionType} from "../state/todolistsReducer";
import {TasksActionType} from "../state/tasksReducer";

export type ActionTypeForApp = TodolistsActionType | TasksActionType;
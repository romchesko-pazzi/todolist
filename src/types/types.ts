import { AppActionsType } from '../state/reducers/appReducer';
import { AuthActionsType } from '../state/reducers/authReducer';
import { TasksActionType } from '../state/reducers/tasksReducer';
import { TodolistsActionType } from '../state/reducers/todolistsReducer';

export type ActionTypeForApp =
  | TodolistsActionType
  | TasksActionType
  | AppActionsType
  | AuthActionsType;

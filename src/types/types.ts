import { AppActionsType } from '../store/reducers/appReducer';
import { AuthActionsType } from '../store/reducers/authReducer';
import { TasksActionType } from '../store/reducers/tasksReducer';
import { TodolistsActionType } from '../store/reducers/todolistsReducer';

export type ActionTypeForApp =
  | TodolistsActionType
  | TasksActionType
  | AppActionsType
  | AuthActionsType;

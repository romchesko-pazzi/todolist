import { AppActionsType } from '../store/reducers/appReducer';
import { AuthActionsType } from '../store/reducers/authReducer';
import { TasksActionType } from '../store/reducers/tasksReducer';

export type ActionTypeForApp = TasksActionType | AppActionsType | AuthActionsType;

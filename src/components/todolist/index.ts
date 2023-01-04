import {
  getTodolists,
  addTodolist,
  renameTodolist,
  removeTodolist,
} from '../../store/reducers/todolistsReducer';

export const todolistActions = {
  removeTodolist,
  renameTodolist,
  getTodolists,
  addTodolist,
};

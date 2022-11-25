import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { AppReducer } from './reducers/appReducer';
import { AuthReducer } from './reducers/authReducer';
import { TasksReducer } from './reducers/tasksReducer';
import { TodolistsReducer } from './reducers/todolistsReducer';

export type RootStateType = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
  todolists: TodolistsReducer,
  tasks: TasksReducer,
  app: AppReducer,
  auth: AuthReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
});

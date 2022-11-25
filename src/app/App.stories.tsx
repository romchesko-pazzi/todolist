import { configureStore } from '@reduxjs/toolkit';
import { ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { v1 } from 'uuid';

import { TaskPriority, TaskStatuses } from '../api/tasks-api';
import { rootReducer } from '../state/store';

import { App } from './App';

export default {
  title: 'App',
  component: App,
  decorators: [Story => <Provider store={storyBookStore}>{Story()}</Provider>],
} as ComponentMeta<typeof App>;

export const initialGlobalState = {
  todolists: [
    {
      id: 'todolistId1',
      title: 'What to learn',
      filter: 'all',
      todoStatus: 'idle',
      addedDate: '',
      order: 0,
    },
  ],
  tasks: {
    todolistId1: [
      {
        id: v1(),
        title: 'HTML&CSS',
        description: '',
        todoListId: '',
        order: 0,
        status: TaskStatuses.New,
        priority: TaskPriority.Low,
        startDate: '',
        deadline: '',
        addedDate: '',
        taskStatus: 'idle',
      },
      {
        id: v1(),
        title: 'JS',
        description: '',
        todoListId: '',
        order: 0,
        status: TaskStatuses.New,
        priority: TaskPriority.Low,
        startDate: '',
        deadline: '',
        addedDate: '',
        taskStatus: 'idle',
      },
    ],
  },
  app: {
    appStatus: 'idle',
    error: '',
    isInitialized: false,
  },
  auth: {
    id: null,
    email: '',
    login: '',
    isAuth: false,
    error: '',
  },
};
export const storyBookStore = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
});

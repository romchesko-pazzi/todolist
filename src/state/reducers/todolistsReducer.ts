import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { todolistsAPI, TodoType } from '../../api/todolist-api';
import { FilterType } from '../../components/todolist/Todolist';
import { AppThunkType } from '../hooks';

import { AppStatusesType, setError, setLoadingBar } from './appReducer';

const initialState: TodolistType[] = [];

const slice = createSlice({
  name: 'todolist',
  initialState,
  reducers: {
    setTodolists: (state, action: PayloadAction<{ todolists: TodoType[] }>) => {
      return action.payload.todolists.map(m => ({
        ...m,
        filter: 'all',
        todoStatus: 'idle',
      }));
    },

    deleteTodolist: (state, action: PayloadAction<{ todolistId: string }>) => {
      return state.filter(f => f.id !== action.payload.todolistId);
    },

    addTodolist: (state, action: PayloadAction<{ todolist: TodoType }>) => {
      return [
        { ...action.payload.todolist, filter: 'all', todoStatus: 'idle' },
        ...state,
      ];
    },

    changeTodolistName: (
      state,
      action: PayloadAction<{ todolistId: string; newTitle: string }>,
    ) => {
      return state.map(m =>
        m.id === action.payload.todolistId ? { ...m, title: action.payload.newTitle } : m,
      );
    },

    disableButton: (
      state,
      action: PayloadAction<{ todolistId: string; value: AppStatusesType }>,
    ) => {
      return state.map(m =>
        m.id === action.payload.todolistId ? { ...m, todoStatus: 'loading' } : m,
      );
    },
  },
});

export const TodolistsReducer = slice.reducer;
export const {
  deleteTodolist,
  changeTodolistName,
  setTodolists,
  addTodolist,
  disableButton,
} = slice.actions;

export const removeTodolist =
  (todolistId: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setLoadingBar({ appStatus: 'loading' }));
      dispatch(disableButton({ todolistId, value: 'loading' }));
      await todolistsAPI.deleteTodolist(todolistId);
      dispatch(deleteTodolist({ todolistId }));
    } catch (err: any) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoadingBar({ appStatus: 'finished' }));
      dispatch(disableButton({ todolistId, value: 'finished' }));
    }
  };

export const addTodolistTC =
  (title: string): AppThunkType =>
  async dispatch => {
    try {
      const response = await todolistsAPI.createTodolist(title);

      if (response.data.messages.length > 0) {
        const error = response.data.messages[0];

        dispatch(setError({ error }));

        return;
      }
      const todolist = response.data.data.item;

      dispatch(addTodolist({ todolist }));
    } catch (err: any) {
      dispatch(setError(err.message));
    }
  };

export const renameTodolist =
  (todolistId: string, title: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setLoadingBar({ appStatus: 'loading' }));
      await todolistsAPI.updateTodolist(todolistId, title);
      dispatch(changeTodolistName({ todolistId, newTitle: title }));
    } catch (err: any) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoadingBar({ appStatus: 'finished' }));
    }
  };

export const fetchTodolists = (): AppThunkType => async dispatch => {
  try {
    dispatch(setLoadingBar({ appStatus: 'loading' }));
    const response = await todolistsAPI.getTodolists();

    dispatch(setTodolists({ todolists: response.data }));
  } catch (err) {
    throw new Error('error on getting todolists');
  } finally {
    dispatch(setLoadingBar({ appStatus: 'finished' }));
  }
};

// types
export type TodolistsActionType =
  | DeleteTodolistType
  | AddTodolistType
  | RenameTodolistType
  | SetTodolistsType
  | DisableButtonType;
export type DeleteTodolistType = ReturnType<typeof deleteTodolist>;
export type AddTodolistType = ReturnType<typeof addTodolist>;
export type SetTodolistsType = ReturnType<typeof setTodolists>;
type RenameTodolistType = ReturnType<typeof changeTodolistName>;
type DisableButtonType = ReturnType<typeof disableButton>;
export type TodolistType = TodoType & {
  filter: FilterType;
  todoStatus: AppStatusesType;
};

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { todolistsAPI } from '../../api/todolist-api';
import { TodoType } from '../../api/types';
import { FilterType } from '../../components/todolist';
import { AppStatuses } from '../../data/constants/appStatuses';
import { ButtonFilters } from '../../data/constants/buttonFilters';

import { AppStatusesType, setError, setLoadingBar } from './appReducer';
import { authActions } from './authReducer';

const initialState: TodolistType[] = [];

const getTodolists = createAsyncThunk(
  'todolists/getTodolists',
  async (param, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoadingBar({ appStatus: AppStatuses.loading }));
      const response = await todolistsAPI.getTodolists();

      return { todolists: response.data };
    } catch (err) {
      const error = err as AxiosError;

      dispatch(setError({ error: error.message }));

      return rejectWithValue(error.message);
    } finally {
      dispatch(setLoadingBar({ appStatus: AppStatuses.finished }));
    }
  },
);

const addTodolist = createAsyncThunk(
  'todolists/addTodolist',
  async (title: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await todolistsAPI.createTodolist(title);

      if (response.data.messages.length > 0) {
        const error = response.data.messages[0];

        dispatch(setError({ error }));

        return rejectWithValue(error);
      }

      return { todolist: response.data.data.item };
    } catch (err: any) {
      const error = err as AxiosError;

      dispatch(setError({ error: error.message }));

      return rejectWithValue(error.message);
    }
  },
);

const removeTodolist = createAsyncThunk(
  'todolists/removeTodolist',
  async (todolistId: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoadingBar({ appStatus: AppStatuses.loading }));
      dispatch(disableButton({ todolistId, value: AppStatuses.loading }));
      await todolistsAPI.deleteTodolist(todolistId);

      return todolistId;
    } catch (err: any) {
      const error = err as AxiosError;

      dispatch(setError({ error: error.message }));

      return rejectWithValue(error.message);
    } finally {
      dispatch(setLoadingBar({ appStatus: AppStatuses.finished }));
      dispatch(disableButton({ todolistId, value: AppStatuses.finished }));
    }
  },
);

const renameTodolist = createAsyncThunk(
  'todolists/renameTodolist',
  async (
    params: { todolistId: string; newTitle: string },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const { todolistId, newTitle } = params;

      dispatch(setLoadingBar({ appStatus: AppStatuses.loading }));
      await todolistsAPI.updateTodolist(todolistId, newTitle);

      return { todolistId, newTitle };
    } catch (err: any) {
      const error = err as AxiosError;

      dispatch(setError({ error: error.message }));

      return rejectWithValue(error.message);
    } finally {
      dispatch(setLoadingBar({ appStatus: AppStatuses.finished }));
    }
  },
);

const slice = createSlice({
  name: 'todolist',
  initialState,
  reducers: {
    disableButton: (
      state,
      action: PayloadAction<{ todolistId: string; value: AppStatusesType }>,
    ) => {
      return state.map(m =>
        m.id === action.payload.todolistId
          ? { ...m, todoStatus: AppStatuses.loading }
          : m,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getTodolists.fulfilled, (state, action) => {
        return action.payload.todolists.map((m: TodoType) => ({
          ...m,
          filter: ButtonFilters.all,
          todoStatus: AppStatuses.idle,
        }));
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        return state.filter(f => f.id !== action.payload);
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        return [
          {
            ...action.payload.todolist,
            filter: ButtonFilters.all,
            todoStatus: AppStatuses.idle,
          },
          ...state,
        ];
      })
      .addCase(renameTodolist.fulfilled, (state, action) => {
        return state.map(m =>
          m.id === action.payload.todolistId
            ? { ...m, title: action.payload.newTitle }
            : m,
        );
      })
      // обнуление данных при выходе из app
      .addCase(authActions.logout.fulfilled, () => []);
  },
});

export const TodolistsReducer = slice.reducer;
const { disableButton } = slice.actions;

export type TodolistType = TodoType & {
  filter: FilterType;
  todoStatus: AppStatusesType;
};

export const todolistsActions = {
  getTodolists,
  addTodolist,
  removeTodolist,
  renameTodolist,
};

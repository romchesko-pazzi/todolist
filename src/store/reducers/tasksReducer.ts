import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ResponseTaskType, tasksAPI, UpdateBody } from '../../api/tasks-api';

import { AppStatusesType, setError, setLoadingBar } from './appReducer';
import {
  addTodolist,
  AddTodolistType,
  deleteTodolist,
  DeleteTodolistType,
  setTodolists,
  SetTodolistsType,
} from './todolistsReducer';

const initialState: TaskType = {};

export const getTasks = createAsyncThunk(
  'tasks/getTasks',
  async (todolistId: string, { dispatch }) => {
    try {
      dispatch(setLoadingBar({ appStatus: 'loading' }));
      const response = await tasksAPI.getTasks(todolistId);

      return { todolistId, tasks: response.data.items }; // делается не диспатч setTasks, а возвращается payload, чтобы можно было юзать в extraReducers
    } catch (err) {
      throw new Error('error on getting tasks');
    } finally {
      dispatch(setLoadingBar({ appStatus: 'finished' }));
    }
  },
);

export const removeTask = createAsyncThunk(
  'tasks/removeTask',
  async (
    params: { todolistId: string; taskId: string },
    { dispatch, rejectWithValue },
  ) => {
    const { todolistId, taskId } = params;

    try {
      dispatch(disableDeleteButton({ value: 'loading', taskId, todolistId }));
      dispatch(setLoadingBar({ appStatus: 'loading' }));
      await tasksAPI.deleteTask(params.todolistId, params.taskId);

      return params;
    } catch (err: any) {
      dispatch(setError(err.message));

      return rejectWithValue({ error: err.message });
    } finally {
      dispatch(setLoadingBar({ appStatus: 'finished' }));
    }
  },
);

export const addNewTask = createAsyncThunk(
  'tasks/addNewTask',
  async (
    params: { title: string; todoListId: string },
    { dispatch, rejectWithValue },
  ) => {
    const { title, todoListId } = params;

    try {
      dispatch(setLoadingBar({ appStatus: 'loading' }));
      const response = await tasksAPI.createTask(todoListId, title);

      if (response.data.messages.length > 0) {
        const error = response.data.messages[0];

        dispatch(setError({ error }));

        return rejectWithValue({ value: error });
      }

      return response.data.data.item;
    } catch (err: any) {
      dispatch(setError(err.message));

      return rejectWithValue({ value: err.message });
    } finally {
      dispatch(setLoadingBar({ appStatus: 'finished' }));
    }
  },
);

export const updateTaskData = createAsyncThunk(
  'tasks/updateTaskData',
  async (task: ResponseTaskType, { dispatch, rejectWithValue }) => {
    const body: UpdateBody = {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    };

    try {
      await tasksAPI.renameTask(task.todoListId, task.id, body);

      return { todolistId: task.todoListId, task: body, taskId: task.id };
    } catch (err: any) {
      dispatch(setError(err.message));

      return rejectWithValue({ rejectedValue: err.message });
    }
  },
);

const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    disableDeleteButton: (
      state,
      action: PayloadAction<{
        todolistId: string;
        taskId: string;
        value: AppStatusesType;
      }>,
    ) => {
      state[action.payload.todolistId] = state[action.payload.todolistId].map(m =>
        m.id === action.payload.taskId ? { ...m, taskStatus: action.payload.value } : m,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(deleteTodolist, (state, action) => {
        delete state[action.payload.todolistId];
      })
      .addCase(setTodolists, (state, action) => {
        action.payload.todolists.forEach(item => {
          state[item.id] = [];
        });
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks;
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const removableTask = tasks.findIndex(task => task.id === action.payload.taskId);

        if (removableTask > -1) tasks.splice(removableTask, 1);
      })
      .addCase(addNewTask.fulfilled, (state, action) => {
        state[action.payload.todoListId].unshift(action.payload);
      })
      .addCase(updateTaskData.fulfilled, (state, action) => {
        state[action.payload.todolistId] = state[action.payload.todolistId].map(m =>
          m.id === action.payload.taskId ? { ...m, ...action.payload.task } : m,
        );
      });
  },
});

export const { disableDeleteButton } = slice.actions;
export const TasksReducer = slice.reducer;

export type TasksActionType =
  | AddTodolistType
  | DeleteTodolistType
  | SetTodolistsType
  | DisableDeleteButtonType;
type DisableDeleteButtonType = ReturnType<typeof disableDeleteButton>;

export type TaskType = {
  [key: string]: ResponseTaskType[];
};

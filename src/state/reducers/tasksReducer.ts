import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ResponseTaskType, tasksAPI, UpdateBody } from '../../api/tasks-api';
import { AppThunkType } from '../hooks';

import { AppStatusesType, setError, setLoadingBar } from './appReducer';
import {
  addTodolist,
  AddTodolistType,
  deleteTodolist,
  DeleteTodolistType,
  setTodolists,
  SetTodolistsType,
} from './todolistsReducer';

enum TasksActions {
  SET_TASKS = 'TASKS/SET_TASKS',
  ADD_TASK = 'TASKS/ADD_TASK',
  DELETE_TASK = 'TASKS/DELETE_TASK',
  UPDATE_TASK = 'TASKS/UPDATE_TASK',
  DISABLE_BTN = 'TASKS/DISABLE_BUTTON',
}

const initialState: TaskType = {};

const slice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTasks: (
      state,
      action: PayloadAction<{ todolistId: string; tasks: ResponseTaskType[] }>,
    ) => {
      return { ...state, [action.payload.todolistId]: action.payload.tasks };
    },

    deleteTask: (
      state,
      action: PayloadAction<{ todolistId: string; taskId: string }>,
    ) => {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(
          f => f.id !== action.payload.taskId,
        ),
      };
    },

    addTask: (state, action: PayloadAction<{ task: ResponseTaskType }>) => {
      return {
        ...state,
        [action.payload.task.todoListId]: [
          action.payload.task,
          ...state[action.payload.task.todoListId],
        ],
      };
    },

    updateTask: (
      state,
      action: PayloadAction<{ todolistId: string; task: UpdateBody; taskId: string }>,
    ) => {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(m =>
          m.id === action.payload.taskId
            ? {
                ...m,
                ...action.payload.task,
              }
            : m,
        ),
      };
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
      });
  },
});

export const { deleteTask, addTask, updateTask, setTasks } = slice.actions;
export const TasksReducer = slice.reducer;

const disableDeleteButton = (
  todolistId: string,
  taskId: string,
  value: AppStatusesType,
) => {
  return {
    type: TasksActions.DISABLE_BTN,
    payload: { todolistId, taskId, value },
  } as const;
};

// TC
export const removeTask =
  (todolistId: string, taskId: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(disableDeleteButton(todolistId, taskId, 'loading'));
      dispatch(setLoadingBar({ appStatus: 'loading' }));
      await tasksAPI.deleteTask(todolistId, taskId);
      dispatch(deleteTask({ todolistId, taskId }));
    } catch (err: any) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoadingBar({ appStatus: 'finished' }));
    }
  };

export const addNewTask =
  (title: string, todolistId: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setLoadingBar({ appStatus: 'loading' }));
      const response = await tasksAPI.createTask(todolistId, title);

      if (response.data.messages.length > 0) {
        const error = response.data.messages[0];

        dispatch(setError({ error }));

        return;
      }
      const task = response.data.data.item;

      dispatch(addTask({ task }));
    } catch (err: any) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoadingBar({ appStatus: 'finished' }));
    }
  };

export const updateTaskData =
  (task: ResponseTaskType): AppThunkType =>
  async dispatch => {
    if (!task) return;
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
      dispatch(updateTask({ todolistId: task.todoListId, task: body, taskId: task.id }));
    } catch (err: any) {
      dispatch(setError(err.message));
    }
  };

export const getTasks =
  (todolistId: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setLoadingBar({ appStatus: 'loading' }));
      const response = await tasksAPI.getTasks(todolistId);

      dispatch(setTasks({ todolistId, tasks: response.data.items }));
    } catch (err) {
      throw new Error('error on getting tasks');
    } finally {
      dispatch(setLoadingBar({ appStatus: 'finished' }));
    }
  };

// types
export type TasksActionType =
  | RemoveTaskType
  | AddTaskType
  | UpdateTaskType
  | AddTodolistType
  | DeleteTodolistType
  | SetTodolistsType
  | SetTasksType
  | DisableDeleteButtonType;
type RemoveTaskType = ReturnType<typeof deleteTask>;
type AddTaskType = ReturnType<typeof addTask>;
type UpdateTaskType = ReturnType<typeof updateTask>;
type SetTasksType = ReturnType<typeof setTasks>;
type DisableDeleteButtonType = ReturnType<typeof disableDeleteButton>;

export type TaskType = {
  [key: string]: ResponseTaskType[];
};

import { AxiosResponse } from 'axios';

import { instance } from './todolist-api';
import { CommonType, DataType, GetType, ResponseTaskType, UpdateBody } from './types';

export const tasksAPI = {
  getTasks(todolistId: string): Promise<AxiosResponse<GetType>> {
    return instance.get<GetType>(`todo-lists/${todolistId}/tasks`);
  },
  createTask(
    todolistId: string,
    title: string,
  ): Promise<AxiosResponse<CommonType<DataType<ResponseTaskType>>>> {
    return instance.post<CommonType<DataType<ResponseTaskType>>>(
      `todo-lists/${todolistId}/tasks`,
      { title },
    );
  },
  deleteTask(todolistId: string, taskId: string): Promise<AxiosResponse<CommonType>> {
    return instance.delete<CommonType>(`todo-lists/${todolistId}/tasks/${taskId}`);
  },
  renameTask(
    todolistId: string,
    taskId: string,
    body: UpdateBody,
  ): Promise<AxiosResponse<CommonType<DataType<ResponseTaskType>>>> {
    return instance.put<CommonType<DataType<ResponseTaskType>>>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      body,
    );
  },
};

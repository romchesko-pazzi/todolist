import { TaskStatuses } from '../data/constants/taskStatuses';
import { AppStatusesType } from '../store/reducers/appReducer';

export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
};
export type AuthMeType = {
  id: number;
  email: string;
  login: string;
};

export type ResponseTaskType = {
  id: string;
  title: string;
  description: string;
  todoListId: string;
  order: number;
  status: TaskStatuses;
  priority: number;
  startDate: string;
  deadline: string;
  addedDate: string;
  taskStatus?: AppStatusesType;
};
export type UpdateBody = {
  title: string;
  description: string;
  status: TaskStatuses;
  priority: number;
  startDate: string;
  deadline: string;
};

export type GetType = {
  items: ResponseTaskType[];
  totalCount: number;
  error: string | null;
};

export type TodoType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type DataType<T = {}> = {
  item: T;
};

export type CommonType<T = {}> = {
  resultCode: number;
  messages: string[];
  fieldsErrors?: string[];
  data: T;
};

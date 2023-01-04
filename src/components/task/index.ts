import {
  removeTask,
  addNewTask,
  getTasks,
  updateTaskData,
} from '../../store/reducers/tasksReducer';

const taskActions = { removeTask, addNewTask, getTasks, updateTaskData };

export { taskActions };

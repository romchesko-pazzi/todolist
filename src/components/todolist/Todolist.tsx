import React, { useCallback, useEffect, useState } from 'react';

import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { ResponseTaskType, TaskStatuses } from '../../api/tasks-api';
import c from '../../assets/commonStyles/common.module.scss';
import { useAppDispatch, useAppSelector } from '../../data/hooks';
import {
  addNewTask,
  getTasks,
  removeTask,
  updateTaskData,
} from '../../store/reducers/tasksReducer';
import {
  removeTodolist,
  renameTodolist,
  TodolistType,
} from '../../store/reducers/todolistsReducer';
import { AddForm } from '../addForm/AddForm';
import { EditableSpan } from '../editableSpan/EditableSpan';
import { Task } from '../task/Task';

import s from './todolist.module.scss';

export const Todolist = React.memo((props: PropsType) => {
  const { todolist } = props;
  const { todoStatus } = todolist;
  const dispatch = useAppDispatch();
  let tasks = useAppSelector(state => state.tasks[todolist.id]);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    dispatch(getTasks(todolist.id));
  }, [dispatch]);

  if (filter === 'completed') {
    tasks = tasks.filter(f => f.status === TaskStatuses.Completed);
  } else if (filter === 'active') {
    tasks = tasks.filter(f => f.status === TaskStatuses.New);
  }

  const filterTask = useCallback((taskTitle: FilterType) => {
    setFilter(taskTitle);
  }, []);
  const addTask = useCallback(
    (newTitle: string) => {
      dispatch(addNewTask({ title: newTitle, todoListId: todolist.id }));
    },
    [todolist.id, dispatch],
  );
  const deleteTask = useCallback(
    (taskId: string) => {
      dispatch(removeTask({ todolistId: todolist.id, taskId }));
    },
    [todolist.id, dispatch],
  );
  const changeTaskStatus = useCallback(
    (task: ResponseTaskType) => {
      dispatch(updateTaskData(task));
    },
    [dispatch],
  );
  const updateTodolistTitle = useCallback(
    (newTitle: string) => {
      dispatch(renameTodolist({ todolistId: todolist.id, newTitle }));
    },
    [todolist.id, dispatch],
  );
  const renameTodolistTask = useCallback(
    (task: ResponseTaskType) => {
      dispatch(updateTaskData(task));
    },
    [dispatch],
  );
  const deleteTodolist = useCallback(() => {
    dispatch(removeTodolist(todolist.id));
  }, [todolist.id, dispatch]);

  return (
    <div className={s.todolist}>
      <div className={s.headingBlock}>
        <h3>
          <EditableSpan name={todolist.title} callback={updateTodolistTitle} />
        </h3>
        <IconButton
          className={c.icon}
          onClick={deleteTodolist}
          disabled={todoStatus === 'loading'}
        >
          <Delete />
        </IconButton>
      </div>
      <div>
        <AddForm callback={addTask} disabled={todoStatus} />
      </div>
      <div>
        {tasks.map(m => {
          return (
            <Task
              key={m.id}
              task={m}
              deleteTask={deleteTask}
              renameTodolistTask={renameTodolistTask}
              changeTaskStatus={changeTaskStatus}
            />
          );
        })}
      </div>
      <div className={s.filterButtons}>
        <button
          className={filter === 'all' ? `${c.button} ${c.all}` : c.button}
          type="button"
          onClick={() => filterTask('all')}
        >
          all
        </button>
        <button
          className={filter === 'active' ? `${c.button} ${c.active}` : c.button}
          type="button"
          onClick={() => filterTask('active')}
          color="secondary"
        >
          active
        </button>
        <button
          className={filter === 'completed' ? `${c.button} ${c.completed}` : c.button}
          type="button"
          onClick={() => filterTask('completed')}
          color="success"
        >
          completed
        </button>
      </div>
    </div>
  );
});

export type FilterType = 'all' | 'active' | 'completed';
type PropsType = {
  todolist: TodolistType;
};

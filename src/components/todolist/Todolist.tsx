import React, { useCallback, useEffect, useState } from 'react';

import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { TaskStatuses } from '../../api/tasks-api';
import c from '../../assets/commonStyles/common.module.scss';
import { useActions } from '../../data/useActions';
import { useAppSelector } from '../../data/useAppSelector';
import { TodolistType } from '../../store/reducers/todolistsReducer';
import { AddForm } from '../addForm/AddForm';
import { EditableSpan } from '../editableSpan/EditableSpan';
import { taskActions } from '../task';
import { Task } from '../task/Task';

import s from './todolist.module.scss';

import { todolistActions } from './index';

export const Todolist = React.memo((props: PropsType) => {
  const { todolist } = props;
  const { todoStatus } = todolist;
  let tasks = useAppSelector(state => state.tasks[todolist.id]);
  const [filter, setFilter] = useState<FilterType>('all');

  // make wrapper around creators to not use dispatch
  const { removeTodolist, renameTodolist } = useActions(todolistActions);
  const { getTasks, addNewTask } = useActions(taskActions);

  useEffect(() => {
    getTasks(todolist.id);
  }, [todolist.id, getTasks]);

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
      addNewTask({ title: newTitle, todoListId: todolist.id });
    },
    [todolist.id, addNewTask],
  );

  const updateTodolistTitle = useCallback(
    (newTitle: string) => {
      renameTodolist({ todolistId: todolist.id, newTitle });
    },
    [todolist.id, renameTodolist],
  );

  const deleteTodolist = useCallback(() => {
    removeTodolist(todolist.id);
  }, [todolist.id, removeTodolist]);

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
        {tasks.map(task => {
          return <Task key={task.id} task={task} todolistId={todolist.id} />;
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

import React, { useCallback, useEffect, useState } from 'react';

import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import c from '../../assets/commonStyles/common.module.scss';
import { AppStatuses } from '../../data/constants/appStatuses';
import { ButtonFilters } from '../../data/constants/buttonFilters';
import { TaskStatuses } from '../../data/constants/taskStatuses';
import { useActions } from '../../data/hooks/useActions';
import { useAppSelector } from '../../data/hooks/useAppSelector';
import { todolistsActions } from '../../pages/todolists';
import { TodolistType } from '../../store/reducers/todolistsReducer';
import { AddForm } from '../addForm';
import { EditableSpan } from '../editableSpan';
import { Task, tasksActions } from '../task';

import s from './todolist.module.scss';

export const Todolist = React.memo((props: PropsType) => {
  const { todolist } = props;
  const { todoStatus } = todolist;
  let tasks = useAppSelector(state => state.tasks[todolist.id]);
  const [filter, setFilter] = useState<FilterType>(ButtonFilters.all);

  // make wrapper around creators to not use dispatch
  const { removeTodolist, renameTodolist } = useActions(todolistsActions);
  const { getTasks, addNewTask } = useActions(tasksActions);

  useEffect(() => {
    getTasks(todolist.id);
  }, [todolist.id, getTasks]);

  if (filter === ButtonFilters.completed) {
    tasks = tasks.filter(f => f.status === TaskStatuses.Completed);
  } else if (filter === ButtonFilters.active) {
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

  const buttonRender = (buttonName: FilterType) => {
    let style = `${c.button} ${c.all}`;

    if (buttonName === ButtonFilters.active) {
      style = `${c.button} ${c.active}`;
    } else if (buttonName === ButtonFilters.completed) {
      style = `${c.button} ${c.completed}`;
    }

    return (
      <button
        className={filter === buttonName ? style : c.button}
        type="button"
        onClick={() => filterTask(buttonName)}
      >
        {buttonName}
      </button>
    );
  };

  return (
    <div className={s.todolist}>
      <div className={s.headingBlock}>
        <h3>
          <EditableSpan name={todolist.title} callback={updateTodolistTitle} />
        </h3>
        <IconButton
          className={c.icon}
          onClick={deleteTodolist}
          disabled={todoStatus === AppStatuses.loading}
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
        {buttonRender(ButtonFilters.all)}
        {buttonRender(ButtonFilters.active)}
        {buttonRender(ButtonFilters.completed)}
      </div>
    </div>
  );
});

export type FilterType = 'all' | 'active' | 'completed';
type PropsType = {
  todolist: TodolistType;
};

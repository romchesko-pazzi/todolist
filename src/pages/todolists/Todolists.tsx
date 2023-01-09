import React, { useCallback, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { AddForm } from '../../components/addForm';
import { Todolist } from '../../components/todolist';
import { useActions } from '../../data/hooks/useActions';
import { useAppSelector } from '../../data/hooks/useAppSelector';
import { TodolistType } from '../../store/reducers/todolistsReducer';
import { selectIsAuth } from '../login';

import s from './todolists.module.scss';
import { selectTodolists } from './todolistSelectors';

import { todolistsActions } from './index';

export const Todolists = () => {
  const navigate = useNavigate();
  const todolists = useAppSelector(selectTodolists);
  const isAuth = useAppSelector(selectIsAuth);
  const { getTodolists, addTodolist } = useActions(todolistsActions);

  useEffect(() => {
    if (isAuth) getTodolists();
    if (!isAuth) navigate('/');
  }, [getTodolists, isAuth, navigate]);

  const addTodoList = useCallback(
    (title: string) => {
      addTodolist(title);
    },
    [addTodolist],
  );

  return (
    <div className={s.main}>
      <AddForm callback={addTodoList} />
      <div className={s.todolists}>
        {todolists.map((m: TodolistType) => {
          return <Todolist todolist={m} key={m.id} />;
        })}
      </div>
    </div>
  );
};

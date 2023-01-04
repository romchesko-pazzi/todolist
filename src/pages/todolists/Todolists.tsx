import React, { useCallback, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { AddForm } from '../../components/addForm/AddForm';
import { todolistActions } from '../../components/todolist';
import { Todolist } from '../../components/todolist/Todolist';
import { useActions } from '../../data/useActions';
import { useAppSelector } from '../../data/useAppSelector';
import { TodolistType } from '../../store/reducers/todolistsReducer';
import { authSelectors } from '../login';

import s from './todolists.module.scss';
import { selectTodolists } from './todolistSelectors';

export const Todolists = () => {
  const navigate = useNavigate();
  const todolists = useAppSelector(selectTodolists);
  const isAuth = useAppSelector(authSelectors.selectIsAuth);
  const { getTodolists, addTodolist } = useActions(todolistActions);

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

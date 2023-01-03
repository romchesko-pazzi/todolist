import React, { useCallback, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { AddForm } from '../../components/addForm/AddForm';
import { Todolist } from '../../components/todolist/Todolist';
import { useAppDispatch, useAppSelector } from '../../data/hooks';
import {
  addTodolist,
  getTodolists,
  TodolistType,
} from '../../store/reducers/todolistsReducer';

import s from './todolists.module.scss';

export const Todolists = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const todolists = useAppSelector(state => state.todolists);
  const isAuth = useAppSelector(state => state.auth.isAuth);

  useEffect(() => {
    if (isAuth) dispatch(getTodolists());
    if (!isAuth) navigate('/');
  }, [dispatch, isAuth, navigate]);

  const addTodoList = useCallback(
    (title: string) => {
      dispatch(addTodolist(title));
    },
    [dispatch],
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

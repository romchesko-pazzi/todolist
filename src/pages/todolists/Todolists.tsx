import React, { useCallback, useEffect } from 'react';

import { Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { AddForm } from '../../components/addForm/AddForm';
import { Todolist } from '../../components/todolist/Todolist';
import { useAppDispatch, useAppSelector } from '../../data/hooks';
import {
  addTodolist,
  getTodolists,
  TodolistType,
} from '../../store/reducers/todolistsReducer';

export const Todolists = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const todolists = useAppSelector(state => state.todolists);
  const isAuth = useAppSelector(state => state.auth.isAuth);

  useEffect(() => {
    if (!isAuth) navigate('/');
  }, [isAuth, navigate]);

  useEffect(() => {
    if (isAuth) dispatch(getTodolists());
  }, [dispatch]);

  const addTodoList = useCallback(
    (title: string) => {
      dispatch(addTodolist(title));
    },
    [dispatch],
  );

  return (
    <div>
      <Grid container style={{ padding: '15px' }}>
        <AddForm callback={addTodoList} />
      </Grid>
      <Grid container spacing={5}>
        {todolists.map((m: TodolistType) => {
          return (
            <Grid item key={m.id}>
              <Paper elevation={4} style={{ padding: '20px' }}>
                <Todolist todolist={m} key={m.id} />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

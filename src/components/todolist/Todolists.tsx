import React, { useCallback, useEffect } from 'react';

import { Grid, Paper } from '@mui/material';
import { Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../state/hooks';
import {
  addTodolistTC,
  fetchTodolists,
  TodolistType,
} from '../../state/reducers/todolistsReducer';
import { AddForm } from '../addForm/AddForm';

import { Todolist } from './Todolist';

export const Todolists = () => {
  const dispatch = useAppDispatch();
  const todolists = useAppSelector(state => state.todolists);
  const isAuth = useAppSelector(state => state.auth.isAuth);

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchTodolists());
    }
  }, []);

  const addTodoList = useCallback(
    (titleOfTodolist: string) => {
      dispatch(addTodolistTC(titleOfTodolist));
    },
    [dispatch],
  );

  if (!isAuth) {
    return <Navigate to="login" />;
  }

  return (
    <div>
      <Grid container style={{ padding: '15px' }}>
        <AddForm name="add todolist" callback={addTodoList} />
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

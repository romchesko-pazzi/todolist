import React, { useEffect } from 'react';

import { LinearProgress } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ErrorSnackBar } from '../components/errorSnackBar/ErrorSnackBar';
import { Header } from '../components/header/Header';
import { path } from '../data/constants/paths';
import { Login } from '../pages/login/Login';
import { NotFound } from '../pages/NotFound/NotFound';
import { Todolists } from '../pages/todolists/Todolists';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { initializeApp } from '../state/reducers/appReducer';

export const App = () => {
  const { isInitialized } = useAppSelector(state => state.app);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeApp());
  }, []);

  if (!isInitialized) {
    return <LinearProgress />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Login />} />
          <Route path={path.todolists} element={<Todolists />} />
          <Route path="*" element={<Navigate to="not-found" />} />
        </Route>
        <Route path={path.notFound} element={<NotFound />} />
      </Routes>
      <ErrorSnackBar />
    </>
  );
};

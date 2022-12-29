import React, { useEffect } from 'react';

import { LinearProgress } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ErrorSnackBar } from '../components/errorSnackBar/ErrorSnackBar';
import { Header } from '../components/header/Header';
import { path } from '../data/constants/paths';
import { useAppDispatch, useAppSelector } from '../data/hooks';
import { Login } from '../pages/login/Login';
import { NotFound } from '../pages/notFound/NotFound';
import { Todolists } from '../pages/todolists/Todolists';
import { initializeApp } from '../store/reducers/appReducer';

export const App = () => {
  const { isInitialized } = useAppSelector(state => state.app);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

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

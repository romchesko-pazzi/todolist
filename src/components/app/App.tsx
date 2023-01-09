import React, { useEffect } from 'react';

import { LinearProgress } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';

import { path } from '../../data/constants/paths';
import { useActions } from '../../data/hooks/useActions';
import { useAppSelector } from '../../data/hooks/useAppSelector';
import { Login } from '../../pages/login';
import { NotFound } from '../../pages/notFound';
import { Todolists } from '../../pages/todolists';
import { ErrorSnackBar } from '../errorSnackBar';
import { Header } from '../header';

import { selectIsAppInitialized } from './appSelectors';

import { appActions } from './index';

export const App = () => {
  const isInitialized = useAppSelector(selectIsAppInitialized);
  const { initializeApp } = useActions(appActions);

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

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

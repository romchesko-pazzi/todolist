import React from 'react';

import { LinearProgress } from '@mui/material';
import { Outlet } from 'react-router-dom';

import c from '../../assets/commonStyles/common.module.scss';
import { useActions } from '../../data/useActions';
import { useAppSelector } from '../../data/useAppSelector';
import { authActions, authSelectors } from '../../pages/login';
import { appSelectors } from '../app';

import s from './header.module.scss';

export const Header = () => {
  const isAuth = useAppSelector(authSelectors.selectIsAuth);
  const appStatus = useAppSelector(appSelectors.selectAppStatus);
  const { logout } = useActions(authActions);

  const logoutHandler = () => {
    logout();
  };

  return (
    <>
      {appStatus === 'loading' ? (
        <LinearProgress />
      ) : (
        <div className={s.transparentLoading} />
      )}

      <div className={s.main}>
        <h1 className={s.heading}>Todolist</h1>
        {isAuth && (
          <button
            type="button"
            className={`${c.button} + ${s.button}`}
            onClick={logoutHandler}
          >
            Logout
          </button>
        )}
      </div>
      <Outlet />
    </>
  );
};

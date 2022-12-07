import React from 'react';

import { LinearProgress } from '@mui/material';
import { Outlet } from 'react-router-dom';

import c from '../../assets/commonStyles/common.module.scss';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { logoutTC } from '../../state/reducers/authReducer';

import s from './header.module.scss';

export const Header = () => {
  const { isAuth } = useAppSelector(state => state.auth);
  const { appStatus } = useAppSelector(state => state.app);
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logoutTC());
  };

  return (
    <>
      <div className={s.header}>
        {isAuth && (
          <button type="button" className={c.button} onClick={logoutHandler}>
            Logout
          </button>
        )}
      </div>
      {appStatus === 'loading' && <LinearProgress />}
      <Outlet />
    </>
  );
};

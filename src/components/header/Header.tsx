import React from 'react';

import { LinearProgress } from '@mui/material';
import { Outlet } from 'react-router-dom';

import c from '../../assets/commonStyles/common.module.scss';
import { useAppDispatch, useAppSelector } from '../../data/hooks';
import { logout } from '../../store/reducers/authReducer';

import s from './header.module.scss';

export const Header = () => {
  const { isAuth } = useAppSelector(state => state.auth);
  const { appStatus } = useAppSelector(state => state.app);
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logout());
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

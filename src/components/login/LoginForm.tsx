import React from 'react';

import { LoginParamsType } from '../../api/login-api';
import { useAppDispatch } from '../../state/hooks';
import { loginTC } from '../../state/reducers/authReducer';

import { Login } from './Login';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const login = (obj: LoginParamsType) => {
    dispatch(loginTC(obj));
  };

  return (
    <div>
      <Login login={login} />
    </div>
  );
};

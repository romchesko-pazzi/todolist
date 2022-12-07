import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authAPI, LoginParamsType } from '../../api/login-api';
import { AppThunkType } from '../hooks';

import { setError, setLoadingBar } from './appReducer';

const initialState = {
  id: null,
  email: '',
  login: '',
  isAuth: false,
  error: '',
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { setIsLoggedIn } = slice.actions;

export const AuthReducer = slice.reducer;

export const loginTC =
  (obj: LoginParamsType): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setLoadingBar({ appStatus: 'loading' }));
      const response = await authAPI.login(obj);

      if (response.data.messages.length > 0) {
        const error = response.data.messages[0];

        dispatch(setError({ error }));

        return;
      }
      dispatch(setIsLoggedIn(true));
    } catch (err: any) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoadingBar({ appStatus: 'finished' }));
    }
  };

export const logoutTC = (): AppThunkType => async dispatch => {
  try {
    dispatch(setLoadingBar({ appStatus: 'loading' }));
    const response = await authAPI.logout();

    if (response.data.messages.length > 0) {
      const error = response.data.messages[0];

      dispatch(setError({ error }));

      return;
    }
    dispatch(setIsLoggedIn(false));
  } catch (err: any) {
    dispatch(setError(err.message));
  } finally {
    dispatch(setLoadingBar({ appStatus: 'finished' }));
  }
};

export type AuthActionsType = ReturnType<typeof setIsLoggedIn>;

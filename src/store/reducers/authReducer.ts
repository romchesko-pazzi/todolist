import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authAPI, LoginParamsType } from '../../api/login-api';
import { AppStatuses } from '../../data/constants/appStatuses';

import { setError, setLoadingBar } from './appReducer';

const initialState = {
  id: null,
  email: '',
  login: '',
  isAuth: false,
  error: '',
};

const login = createAsyncThunk(
  'auth/login',
  async (loginData: LoginParamsType, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoadingBar({ appStatus: AppStatuses.loading }));
      const response = await authAPI.login(loginData);

      if (response.data.messages.length > 0) {
        const error = response.data.messages[0];

        dispatch(setError({ error }));

        return rejectWithValue({ isAuth: false });
      }
      dispatch(setIsLoggedIn(true));
    } catch (err: any) {
      return rejectWithValue({ isAuth: false });
    } finally {
      dispatch(setLoadingBar({ appStatus: AppStatuses.finished }));
    }
  },
);

const logout = createAsyncThunk('auth/logout', async (params, { dispatch }) => {
  try {
    dispatch(setLoadingBar({ appStatus: AppStatuses.loading }));
    const response = await authAPI.logout();

    if (response.data.messages.length > 0) {
      const error = response.data.messages[0];

      dispatch(setError({ error }));
    }

    dispatch(setIsLoggedIn(false));
  } catch (err: any) {
    dispatch(setError({ error: err.message }));
  } finally {
    dispatch(setLoadingBar({ appStatus: AppStatuses.finished }));
  }
});

export const authActions = { login, logout };

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

export type AuthActionsType = ReturnType<typeof setIsLoggedIn>;

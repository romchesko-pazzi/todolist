import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authAPI } from '../../api/login-api';

import { setIsLoggedIn } from './authReducer';

const initialState = {
  appStatus: 'idle',
  error: null as string | null,
  isInitialized: false,
};

export const initializeApp = createAsyncThunk(
  'app/initApp',
  async (param, { dispatch }) => {
    try {
      const isAuthMe = await authAPI.authMe();

      if (isAuthMe.data.resultCode === 0) {
        dispatch(setIsLoggedIn(true));
      } else if (isAuthMe.data.resultCode !== 0) {
        dispatch(setError({ error: isAuthMe.data.messages[0] }));
      }
    } catch (err: any) {
      dispatch(setError(err));
    } finally {
      dispatch(setIsInitialized({ value: true }));
    }
  },
);

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoadingBar: (state, action: PayloadAction<{ appStatus: AppStatusesType }>) => {
      state.appStatus = action.payload.appStatus;
    },
    setError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setIsInitialized: (state, action: PayloadAction<{ value: boolean }>) => {
      state.isInitialized = action.payload.value;
    },
  },
});

export const AppReducer = slice.reducer;

export const { setLoadingBar, setError, setIsInitialized } = slice.actions;

type SetLoadingBarType = ReturnType<typeof setLoadingBar>;
type SetErrorType = ReturnType<typeof setError>;
type SetIsInitializedType = ReturnType<typeof setIsInitialized>;
export type AppStatusesType = 'loading' | 'idle' | 'successful' | 'finished' | 'failed';
export type AppActionsType = SetLoadingBarType | SetErrorType | SetIsInitializedType;

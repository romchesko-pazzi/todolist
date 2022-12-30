import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authAPI } from '../../api/login-api';
import { AppStatuses } from '../../data/constants/appStatuses';

import { setIsLoggedIn } from './authReducer';

const initialState = {
  appStatus: AppStatuses.idle,
  error: null as string | null,
  isInitialized: false,
};

export const initializeApp = createAsyncThunk(
  'app/initApp',
  async (param, { dispatch, rejectWithValue }) => {
    try {
      const isAuthMe = await authAPI.authMe();

      if (isAuthMe.data.resultCode === 0) dispatch(setIsLoggedIn(true));
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoadingBar: (state, action: PayloadAction<{ appStatus: AppStatuses }>) => {
      state.appStatus = action.payload.appStatus;
    },
    setError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
  },
  extraReducers: builder => {
    builder.addCase(initializeApp.fulfilled, state => {
      state.isInitialized = true;
    });
  },
});

export const AppReducer = slice.reducer;

export const { setLoadingBar, setError } = slice.actions;

type SetLoadingBarType = ReturnType<typeof setLoadingBar>;
type SetErrorType = ReturnType<typeof setError>;
export type AppStatusesType = 'loading' | 'idle' | 'successful' | 'finished' | 'failed';
export type AppActionsType = SetLoadingBarType | SetErrorType;

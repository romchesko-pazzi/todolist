import { configureStore } from '@reduxjs/toolkit';
import { ComponentMeta } from '@storybook/react';
import thunkMiddleware from 'redux-thunk';

import { rootReducer } from '../state/store';
import { ProviderDecorator } from '../stories/ProviderDecorator';

import { App } from './App';

export default {
  title: 'App',
  component: App,
  decorators: [ProviderDecorator],
} as ComponentMeta<typeof App>;

export const storyBookStore = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
});

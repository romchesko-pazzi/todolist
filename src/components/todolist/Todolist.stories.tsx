import { configureStore } from '@reduxjs/toolkit';
import { ComponentMeta } from '@storybook/react';

import { rootReducer } from '../../state/store';
import { ProviderDecorator } from '../../stories/ProviderDecorator';

import { Todolist } from './Todolist';

export default {
  title: 'Todolist',
  component: Todolist,
  decorators: [ProviderDecorator],
} as ComponentMeta<typeof Todolist>;

const storyBookStore = configureStore({
  reducer: rootReducer,
});

const TodolistExample = () => {
  return (
    <Todolist
      todolist={{
        id: storyBookStore.getState().todolists[0].id,
        title: storyBookStore.getState().todolists[0].title,
        filter: storyBookStore.getState().todolists[0].filter,
        addedDate: storyBookStore.getState().todolists[0].addedDate,
        order: storyBookStore.getState().todolists[0].order,
        todoStatus: storyBookStore.getState().todolists[0].todoStatus,
      }}
    />
  );
};

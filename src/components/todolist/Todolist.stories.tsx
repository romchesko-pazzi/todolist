import { ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { initialGlobalState } from '../../app/App.stories';
import { rootReducer, RootStateType } from '../../state/store';

import { Todolist } from './Todolist';

export default {
  title: 'Todolist',
  component: Todolist,
  decorators: [Story => <Provider store={storyBookStore}>{Story()}</Provider>],
} as ComponentMeta<typeof Todolist>;

export const storyBookStore = createStore(
  rootReducer,
  initialGlobalState as RootStateType,
);

export const TodolistExample = () => {
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

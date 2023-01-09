import { v1 } from 'uuid';

import {
  todolistsActions,
  TodolistType,
  TodolistsReducer,
} from '../store/reducers/todolistsReducer';

let todolistId1: string;
let todolistId2: string;
let startState: TodolistType[] = [];
const { removeTodolist, renameTodolist, addTodolist } = todolistsActions;

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();

  startState = [
    {
      id: todolistId1,
      title: 'What to learn',
      todoStatus: 'idle',
      filter: 'all',
      addedDate: '',
      order: 0,
    },
    {
      id: todolistId2,
      title: 'What to buy',
      todoStatus: 'idle',
      filter: 'all',
      addedDate: '',
      order: 0,
    },
  ];
});

test('correct todolist should be removed', () => {
  const endState = TodolistsReducer(
    startState,
    removeTodolist.fulfilled(todolistId1, '', todolistId1),
  );

  expect(endState.length).toStrictEqual(1);
  expect(endState[0].title).toStrictEqual('What to buy');
  expect(endState[0]).not.toStrictEqual(startState[0]);
});

test('correct todolist should be added', () => {
  const action = addTodolist.fulfilled(
    { todolist: startState[0] },
    '',
    'new todolist title',
  );
  const endState = TodolistsReducer(startState, action);
  const expectedEndStateLength = 3;

  expect(endState.length).toStrictEqual(expectedEndStateLength);
  expect(endState[0].title).toStrictEqual('What to learn');
  expect(endState[0].filter).toStrictEqual('all');
  expect(endState[0].id).toBeDefined();
});

test('correct todolist should change its name', () => {
  const newTodolistName = 'new name of todolist';

  const action = renameTodolist.fulfilled(
    {
      todolistId: todolistId2,
      newTitle: newTodolistName,
    },
    '',
    {
      todolistId: todolistId2,
      newTitle: newTodolistName,
    },
  );
  const endState = TodolistsReducer(startState, action);

  expect(endState[0].title).toStrictEqual('What to learn');
  expect(endState[1].title).toStrictEqual(newTodolistName);
  expect(endState.length).toStrictEqual(2);
});

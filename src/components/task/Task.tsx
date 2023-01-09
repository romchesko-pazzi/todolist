import React, { ChangeEvent, memo, useCallback } from 'react';

import { Delete } from '@mui/icons-material';
import { Checkbox, IconButton } from '@mui/material';

import { ResponseTaskType } from '../../api/types';
import c from '../../assets/commonStyles/common.module.scss';
import { TaskStatuses } from '../../data/constants/taskStatuses';
import { useActions } from '../../data/hooks/useActions';
import { EditableSpan } from '../editableSpan';

import s from './task.module.scss';

import { tasksActions } from './index';

type TaskPropsType = {
  task: ResponseTaskType;
  todolistId: string;
};

export const Task = memo((props: TaskPropsType) => {
  const { todolistId, task } = props;
  const { taskStatus } = task;
  const { updateTaskData, removeTask } = useActions(tasksActions);

  const changeTaskStatusHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newTask = {
        ...task,
        status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,
      };

      updateTaskData(newTask);
    },
    [updateTaskData, task],
  );

  const removeTaskHandler = useCallback(
    (taskId: string) => {
      removeTask({ todolistId, taskId });
    },
    [todolistId, removeTask],
  );

  const renameTaskHandler = useCallback(
    (newTitle: string) => {
      const newTask = { ...task, title: newTitle };

      updateTaskData(newTask);
    },
    [updateTaskData, task],
  );

  return (
    <div className={s.task}>
      <Checkbox
        className={c.icon}
        checked={task.status === TaskStatuses.Completed}
        onChange={changeTaskStatusHandler}
      />
      <EditableSpan name={task.title} callback={renameTaskHandler} />
      <IconButton
        className={c.icon}
        onClick={() => removeTaskHandler(task.id)}
        disabled={taskStatus === 'loading'}
      >
        <Delete />
      </IconButton>
    </div>
  );
});

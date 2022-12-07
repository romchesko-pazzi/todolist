import React, { ChangeEvent, memo, useCallback } from 'react';

import { Delete } from '@mui/icons-material';
import { Checkbox, IconButton } from '@mui/material';

import { TaskStatuses, ResponseTaskType } from '../../api/tasks-api';
import c from '../../assets/commonStyles/common.module.scss';
import { EditableSpan } from '../editableSpan/EditableSpan';

import s from './task.module.scss';

type TaskPropsType = {
  task: ResponseTaskType;
  deleteTask: (taskId: string) => void;
  renameTodolistTask: (newTask: ResponseTaskType) => void;
  changeTaskStatus: (newTask: ResponseTaskType) => void;
};

export const Task = memo((props: TaskPropsType) => {
  const { deleteTask, renameTodolistTask, changeTaskStatus, task } = props;

  const renameTaskHandler = useCallback(
    (newTitle: string) => {
      const newTask = { ...task, title: newTitle };

      renameTodolistTask(newTask);
    },
    [task.id],
  );

  const changeTaskStatusHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newTask = {
        ...task,
        status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,
      };

      changeTaskStatus(newTask);
    },
    [task],
  );

  const { taskStatus } = task;

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
        onClick={() => deleteTask(task.id)}
        disabled={taskStatus === 'loading'}
      >
        <Delete />
      </IconButton>
    </div>
  );
});

import React, {ChangeEvent, memo, useCallback} from 'react';
import s from "../todolist/Todolist.module.css";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../editableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, ResponseTaskType} from "../../api/tasks";

type TaskPropsType = {
    task: ResponseTaskType
    deleteTask: (taskId: string) => void
    renameTodolistTask: (newTask: ResponseTaskType) => void
    changeTaskStatus: (newTask: ResponseTaskType) => void
}

export const Task = memo((props: TaskPropsType) => {

        const {deleteTask, renameTodolistTask, changeTaskStatus, task} = props;

        const renameTaskHandler = useCallback((newTitle: string) => {
            const newTask = {...task, title: newTitle};
            renameTodolistTask(newTask);
        }, [task.id]);

        const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            const newTask = {...task, status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}
            changeTaskStatus(newTask);
        }, []);

        const taskStatus = task.taskStatus;

        return (
            <div className={task.status === TaskStatuses.Completed ? s.isDone : ""}>
                <Checkbox checked={task.status === TaskStatuses.Completed}
                          onChange={changeTaskStatusHandler}/>
                <EditableSpan name={task.title}
                              callback={renameTaskHandler}/>
                <IconButton onClick={() => deleteTask(task.id)} disabled={taskStatus === "loading"}>
                    <Delete/>
                </IconButton>
            </div>
        );
    })
;

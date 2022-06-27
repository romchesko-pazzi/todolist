import React, {memo, useCallback} from 'react';
import s from "../todolist/Todolist.module.css";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../editableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "../../api/tasks";

type TaskPropsType = {
    task: TaskType
    deleteTask: (taskID: string) => void
    renameTodolistTask: (newTitle: string, taskID: string) => void
    changeTaskStatus: (todolistId: string, id: string, value: boolean) => void
    todolistId: string
}

export const Task = memo((props: TaskPropsType) => {

    const {deleteTask, renameTodolistTask, changeTaskStatus, todolistId, task} = props;

    const renameTaskHandler = useCallback((newTitle: string) => {
        renameTodolistTask(newTitle, task.id);
    }, [task.id]);

    return (
        <div className={task.status === TaskStatuses.Completed ? s.isDone : ""}>
            <Checkbox checked={task.status === TaskStatuses.Completed}
                      onChange={(e) => changeTaskStatus(todolistId, task.id, e.currentTarget.checked)}/>
            <EditableSpan name={task.title}
                          callback={renameTaskHandler}/>
            <IconButton onClick={() => deleteTask(task.id)}>
                <Delete/>
            </IconButton>
        </div>
    );
});

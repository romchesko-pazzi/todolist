import React, {useCallback} from 'react';
import s from "../Todolist.module.css";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "../Todolist";

type TaskPropsType = {
    task: TaskType
    deleteTask: (taskID: string) => void
    renameTodolistTask: (newTitle: string, taskID: string) => void
    changeTaskStatus: (todolistID: string, id: string, value: boolean) => void
    todolistID: string
}

export const Task = React.memo((props: TaskPropsType) => {
    const {deleteTask, renameTodolistTask, changeTaskStatus, todolistID, task} = props;

    const renameTaskHandler = useCallback((newTitle: string) => {
        renameTodolistTask(newTitle, task.id);
    }, [task.id]);

    return (
        <div className={task.isDone ? s.isDone : ""}>
            <Checkbox checked={task.isDone}
                      onChange={(e) => changeTaskStatus(todolistID, task.id, e.currentTarget.checked)}/>
            <EditableSpan name={task.title}
                          callback={renameTaskHandler}/>
            <IconButton onClick={() => deleteTask(task.id)}>
                <Delete/>
            </IconButton>
        </div>
    );
});

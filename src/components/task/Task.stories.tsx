import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {TaskPriority, TaskStatuses} from "../../api/tasks-api";
import {ErrorsStatusType} from "../../state/reducers/appReducer";

export default {
    title: 'Task',
    component: Task,
}

const deleteTask = action("Task was deleted");
const renameTask = action("Task was renamed");
const changeCheckbox = action("checkbox was changed");

export const TaskExample = () => {
    return (
        <>
            <Task
                task={
                    {
                        id: "1",
                        title: "React",
                        description: "",
                        todoListId: "",
                        order: 0,
                        status: TaskStatuses.Completed,
                        priority: TaskPriority.Low,
                        startDate: "",
                        deadline: "",
                        addedDate: "",
                        taskStatus: "idle"
                    }
                }
                deleteTask={deleteTask}
                renameTodolistTask={renameTask}
                changeTaskStatus={changeCheckbox}
            />
            <Task
                task={{
                    id: "2",
                    title: "Redux",
                    description: "",
                    todoListId: "",
                    order: 0,
                    status: TaskStatuses.New,
                    priority: TaskPriority.Low,
                    startDate: "",
                    deadline: "",
                    addedDate: "",
                    taskStatus: "idle"
                }}
                deleteTask={deleteTask}
                renameTodolistTask={renameTask}
                changeTaskStatus={changeCheckbox}
            />
        </>
    )
}
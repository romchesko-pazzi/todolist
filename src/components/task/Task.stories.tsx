import {action} from "@storybook/addon-actions";
import {Task} from "./Task";

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
                task={{
                    id: "1",
                    title: "React",
                    isDone: true,
                }}
                deleteTask={deleteTask}
                renameTodolistTask={renameTask}
                changeTaskStatus={changeCheckbox}
                todolistID={"1"}/>
            <Task
                task={{
                    id: "2",
                    title: "Redux",
                    isDone: false,
                }}
                deleteTask={deleteTask}
                renameTodolistTask={renameTask}
                changeTaskStatus={changeCheckbox}
                todolistID={"2"}/>
        </>
    )
}
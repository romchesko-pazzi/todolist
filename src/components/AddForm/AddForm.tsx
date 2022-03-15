import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
// import {Button} from "../Button/Button";
import s from "../../Todolist.module.css"
import {Button} from "@mui/material";

type AddFormPropsType = {
    callback: (title: string) => void,
    name:string,
}

export const AddForm = (props: AddFormPropsType) => {
    const {callback,name} = props
    const [value, setValue] = useState("");
    const [error, setError] = useState(false);


    const onClickHandler = () => {
        if (value.trim() !== "") {
            callback(value.trim());
            setValue("");
        }
        if (value === "") {
            setError(true);
        }
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onClickHandler()
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false);
        setValue(event.currentTarget.value);
    }

    return (
        <div>
            <input value={value} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
            {/*<Button name={name} callBack={onClickHandler}/>*/}
            <Button variant={"contained"}/>
            {error ? <div className={s.errorMessage}>Title is required</div> : ""}
        </div>
    );
};

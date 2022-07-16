import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";
import {setError} from "../../state/appReducer";
import {useAppDispatch} from "../../state/hooks";

export type EditableSpanPropsType = {
    name: string
    callback: (newTitle: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    const {name, callback} = props;
    const dispatch = useAppDispatch();
    const [field, setField] = useState<"span" | "input">("span");
    const [value, setValue] = useState(name);

    const onDoubleClickHandler = () => {
        setField("input");
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.value.length > 11) {
            dispatch(setError("maximum length is 11"))
            return
        }
        setValue(event.currentTarget.value);
    }

    const onBlurHandler = () => {
        callback(value);
        setField("span");
    }

    return (
        <>
            {field === "input" ? <TextField
                variant={"standard"}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                value={value}
                autoFocus
            /> : <span onDoubleClick={onDoubleClickHandler}>{name}</span>}
        </>
    );
});
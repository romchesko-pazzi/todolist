import React, {ChangeEvent, useState} from 'react';

export type EditableSpanPropsType = {
    name: string
    callback:(newTitle:string)=>void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const {name,callback} = props;

    const [spanOrInput, setSpanOrInput] = useState(false)
    const [value, setValue] = useState(name);

    const onDoubleClickHandler = () => {
        setSpanOrInput(true);
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    }

    const onBlurHandler = () => {
        callback(value)
        setSpanOrInput(false);
    }

    return (
        <>
            {spanOrInput ? <input
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                value={value}
                autoFocus
                type="text"/> : <span onDoubleClick={onDoubleClickHandler}>{name}</span>}
        </>
    );
};
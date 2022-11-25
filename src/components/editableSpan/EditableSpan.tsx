import React, { ChangeEvent, useState } from 'react';

import { TextField } from '@mui/material';

import { useAppDispatch } from '../../state/hooks';
import { setError } from '../../state/reducers/appReducer';

export type EditableSpanPropsType = {
  name: string;
  callback: (newTitle: string) => void;
};

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  const { name, callback } = props;
  const dispatch = useAppDispatch();
  const [field, setField] = useState<'span' | 'input'>('span');
  const [value, setValue] = useState(name);
  const maxLength = 11;
  const onDoubleClickHandler = () => {
    setField('input');
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.length > maxLength) {
      dispatch(setError({ error: 'maximum length is 11' }));

      return;
    }
    setValue(event.currentTarget.value);
  };

  const onBlurHandler = () => {
    callback(value);
    setField('span');
  };

  return (
    <div>
      {field === 'input' ? (
        <TextField
          variant="standard"
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          value={value}
          autoFocus
        />
      ) : (
        <span onDoubleClick={onDoubleClickHandler}>{name}</span>
      )}
    </div>
  );
});

import React, { ChangeEvent, useState } from 'react';

import { TextField } from '@mui/material';

import c from '../../assets/commonStyles/common.module.scss';
import { useActions } from '../../data/useActions';
import { appActions } from '../app';

import s from './editableSpan.module.scss';

export type EditableSpanPropsType = {
  name: string;
  callback: (newTitle: string) => void;
};

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  const { name, callback } = props;
  const { setError } = useActions(appActions);
  const [field, setField] = useState<'span' | 'input'>('span');
  const [value, setValue] = useState(name);
  const maxLength = 11;
  const onDoubleClickHandler = () => {
    setField('input');
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.length > maxLength) {
      setError({ error: 'maximum length is 11' });

      return;
    }
    setValue(event.currentTarget.value);
  };

  const onBlurHandler = () => {
    callback(value);
    setField('span');
  };

  return (
    <div className={s.main}>
      {field === 'input' ? (
        <TextField
          InputProps={{ className: c.textField }}
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

import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

import { AddCircle } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';

import c from '../../assets/commonStyles/common.module.scss';
import { AppStatusesType } from '../../store/reducers/appReducer';

import s from './addForm.module.scss';

type AddFormPropsType = {
  callback: (title: string) => void;
  disabled?: AppStatusesType;
};

export const AddForm = React.memo((props: AddFormPropsType) => {
  const { callback, disabled } = props;
  const [value, setValue] = useState('');

  const onClickHandler = () => {
    if (value.trim() !== '') {
      callback(value.trim());
      setValue('');
    }
  };

  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onClickHandler();
    }
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const isDisabled = disabled === 'loading';

  return (
    <div className={s.addForm}>
      <TextField
        InputLabelProps={{ className: c.textField }}
        InputProps={{ className: c.textField }}
        label="Title"
        value={value}
        disabled={isDisabled}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
      />
      <div className={s.btn}>
        <IconButton onClick={onClickHandler} disabled={isDisabled}>
          <AddCircle fontSize="large" color="primary" />
        </IconButton>
      </div>
    </div>
  );
});

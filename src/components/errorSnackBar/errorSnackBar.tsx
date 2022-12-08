import React from 'react';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';

import { useAppDispatch, useAppSelector } from '../../data/hooks';
import { setError } from '../../store/reducers/appReducer';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackBar = () => {
  const error = useAppSelector(state => state.app.error);
  const dispatch = useAppDispatch();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setError({ error: null }));
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{ width: '100%', fontFamily: 'inherit', fontSize: '1.5rem' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

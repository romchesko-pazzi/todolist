import React from 'react';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';

import { useActions } from '../../data/hooks/useActions';
import { useAppSelector } from '../../data/hooks/useAppSelector';
import { appActions, appSelectors } from '../app';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar = () => {
  const error = useAppSelector(appSelectors.selectAppError);
  const { setError } = useActions(appActions);
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setError({ error: null });
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

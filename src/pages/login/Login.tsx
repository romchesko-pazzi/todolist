import React, { useEffect } from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import c from '../../assets/commonStyles/common.module.scss';
import { path } from '../../data/constants/paths';
import { useAppDispatch, useAppSelector } from '../../data/hooks';
import { login } from '../../store/reducers/authReducer';

import s from './login.module.scss';

const validate = (values: FormikErrorType) => {
  const minPasswordLength = 3;
  const errors: any = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < minPasswordLength) {
    errors.password = 'Must be 3 characters or more';
  }

  return errors;
};

export const Login = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(state => state.auth.isAuth);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate,
    onSubmit: values => {
      dispatch(login(values));
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (isAuth) navigate(path.todolists);
  }, [isAuth, navigate]);

  return (
    <div className={s.login}>
      <div className={s.frame}>
        <form className={s.form} onSubmit={formik.handleSubmit}>
          <FormControl sx={{ minWidth: '100%' }}>
            <FormLabel
              sx={{ fontSize: '1.6rem', fontFamily: 'inherit', textAlign: 'center' }}
            >
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField
                InputLabelProps={{ className: c.textField }}
                InputProps={{ className: c.textField }}
                label="Email"
                margin="normal"
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email && (
                <div className={s.error}>{formik.errors.email}</div>
              )}

              <TextField
                InputLabelProps={{ className: c.textField }}
                InputProps={{ className: c.textField }}
                label="Password"
                margin="normal"
                type="password"
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password && (
                <div className={s.error}>{formik.errors.password}</div>
              )}

              <FormControlLabel
                className={`${s.label} ${c.icon}`}
                name="rememberMe"
                onChange={formik.handleChange}
                checked={formik.values.rememberMe}
                label="Remember me"
                control={<Checkbox />}
              />

              <button type="submit" className={`${c.button} ${s.button}`}>
                Login
              </button>
            </FormGroup>
          </FormControl>
        </form>
      </div>
    </div>
  );
};

type FormikErrorType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

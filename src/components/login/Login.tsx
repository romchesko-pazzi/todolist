import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {LoginParamsType} from "../../api/login-api";
import {useAppSelector} from "../../state/hooks";
import {Navigate} from "react-router-dom";

const validate = (values: FormikErrorType) => {

    const errors: any = {};

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 3) {
        errors.password = 'Must be 3 characters or more';
    }
    return errors;
};
export const Login: React.FC<LoginPropsType> = (props) => {

    const {login} = props;
    const isAuth = useAppSelector(state => state.auth.isAuth);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate,
        onSubmit: (values) => {
            login(values);
            formik.resetForm();
        },
    });

    if (isAuth) {
        return <Navigate to={"/"}/>;
    }

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>To log in get registered
                                <a href={'https://social-network.samuraijs.com/'}
                                   target={'_blank'}> here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="normal"
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}

                            <TextField
                                label="Password"
                                margin="normal"
                                type="password"
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password && <div>{formik.errors.password}</div>}

                            <FormControlLabel
                                name={"rememberMe"}
                                onChange={formik.handleChange}
                                checked={formik.values.rememberMe}
                                label={'Remember me'}
                                control={<Checkbox/>}
                            />

                            <Button
                                type={'submit'}
                                variant={'contained'}
                                color={'primary'}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}

type FormikErrorType = {
    email: string,
    password: string,
    rememberMe: boolean,
}

type LoginPropsType = {
    login: (obj: LoginParamsType) => void
}
import React, {useEffect} from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../state/hooks";
import {ErrorSnackBar} from "../components/errorSnackBar/ErrorSnackBar";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Todolists} from "../components/todolist/Todolists";
import {LoginForm} from "../components/login/LoginForm";
import {initializeApp} from "../state/reducers/appReducer";
import {logoutTC} from "../state/reducers/authReducer";

export const App = () => {

    const {isAuth} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const {appStatus, isInitialized} = useAppSelector(state => state.app);

    useEffect(() => {
        dispatch(initializeApp());
    }, []);

    if (!isInitialized) {
        return <LinearProgress/>;
    }

    const logoutHandler = () => {
        dispatch(logoutTC());
    }

    return (
        <BrowserRouter>
            <div className="App">
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton edge="start" color="inherit" sx={{mr: 2}}>
                            <Menu/>
                        </IconButton>
                        {isAuth && <Typography variant="h5" color="inherit" component="div">
                            <Button onClick={logoutHandler} variant={"contained"}>
                                Logout
                            </Button>
                        </Typography>}
                    </Toolbar>
                </AppBar>
                {appStatus === "loading" && <LinearProgress/>}
                <Container fixed>
                    <Routes>
                        <Route path={"login"} element={<LoginForm/>}/>
                        <Route path={"/"} element={<Todolists/>}/>
                        <Route path={"404"} element={<h1>404: Page not found</h1>}/>
                        <Route path={"*"} element={<Navigate to={"404"}/>}/>
                    </Routes>
                </Container>
                <ErrorSnackBar/>
            </div>
        </BrowserRouter>
    );
}


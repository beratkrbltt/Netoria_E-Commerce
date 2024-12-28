import React, { useState } from 'react';
import '../css/AuthPage.css';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { IoMdPerson } from "react-icons/io";
import { Button } from '@mui/material';
import { FaLock } from "react-icons/fa";
import { useFormik } from 'formik';
import { registerPageSchema } from '../schemas/RegisterPageSchema';
import loginPageService from '../services/LoginPageService';
import registerPageService from '../services/RegisterPageService';
import { useDispatch } from 'react-redux';
import { setCurrentUser, setLoading } from '../redux/appSlice';
import { UserType } from '../types/Types';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface CheckUserType {
    result: boolean;
    currentUser: UserType | null;
}

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true); // Login ve Register arasında geçiş
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleAuthMode = () => setIsLogin(!isLogin);

    const checkUser = (userList: UserType[], username: string, password: string): CheckUserType => {
        const response: CheckUserType = { result: false, currentUser: null };
        userList.forEach((user: UserType) => {
            if (user.username === username && user.password === password) {
                response.result = true;
                response.currentUser = user;
            }
        });
        return response;
    };

    const submit = async (values: any, actions: any) => {
        try {
            dispatch(setLoading(true));

            if (isLogin) {
                // LOGIN
                const response: UserType[] = await loginPageService.login();
                const checkUserResponse: CheckUserType = checkUser(response, values.username, values.password);
                if (checkUserResponse.result && checkUserResponse.currentUser) {
                    dispatch(setCurrentUser(checkUserResponse.currentUser));
                    localStorage.setItem("currentUser", JSON.stringify(checkUserResponse.currentUser));
                    navigate("/home");
                    toast.success("Login Successful!");
                } else {
                    toast.error("Incorrect username or password");
                }
            } else {
                // REGISTER
                const payload: UserType = {
                    id: String(Math.floor(Math.random() * 999999)),
                    username: values.username,
                    password: values.password,
                    balance: 1000,
                };
                const response = await registerPageService.register(payload);
                if (response) {
                    toast.success("User Registered!");
                    actions.resetForm();
                    setIsLogin(true);
                }
            }
        } catch (error) {
            toast.error(`An error occurred during the process: ${error}`);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const { values, handleSubmit, handleChange, errors, resetForm } = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: submit,
        validationSchema: registerPageSchema
    });

    const clear = () => {
        resetForm();
    }

    return (
        <div className='auth'>
            <div className='background-stripes'></div>
            <div className='main'>
                <h2>{isLogin ? 'Log In' : 'Register'}</h2>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className='form-div'>
                        <TextField
                            sx={{ width: '300px', marginBottom: '20px' }}
                            id="username"
                            placeholder='Username'
                            value={values.username}
                            onChange={handleChange}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IoMdPerson />
                                        </InputAdornment>
                                    )
                                }
                            }}
                            variant="filled"
                            helperText={errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
                        />

                        <TextField
                            sx={{ width: '300px', marginBottom: '20px' }}
                            id="password"
                            type='password'
                            placeholder='Password'
                            value={values.password}
                            onChange={handleChange}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FaLock />
                                        </InputAdornment>
                                    )
                                }
                            }}
                            variant="filled"
                            helperText={errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                        />
                        <div>
                            <Button type='submit'
                                variant='contained'
                                sx={{ backgroundColor: '#5B4342', marginRight: '10px' }}>
                                {isLogin ? 'Log In' : 'Register'}
                            </Button>
                            <Button
                                onClick={() => clear()}
                                className='login-button'
                                variant='contained'
                                sx={{ backgroundColor: '#6c7d6b' }}>
                                Clear
                            </Button>
                        </div>
                        <Button onClick={toggleAuthMode}
                            sx={{ marginTop: '20px', color: '#C19A92' }}>
                            {isLogin ? 'Don’t have an account? Register' : ' Already have an account? Log In'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>


    );
}

export default AuthPage;

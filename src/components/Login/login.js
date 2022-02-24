import React, { useCallback, useState } from 'react'
import { Grid,Paper, Avatar, TextField, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import './style.css';

const Login=()=> {
    const [userInputs, setLoginInputs] = useState({userName:"", password:""});
    const navigate = useNavigate();

    const submitHandler = useCallback(()=>{
        if(userInputs.userName === 'test' && userInputs.password === 'test') {
          window.sessionStorage.setItem('userInfo', JSON.stringify(userInputs));
          navigate('/dashboard');
        }
    },[userInputs, navigate]);

    const onChangeHander = useCallback((e)=>{
        const value = e.target.value;
        setLoginInputs({...userInputs, [e.target.name]: value});
    },[userInputs, setLoginInputs]);

    return(
        <Grid>
            <Paper elevation={10} className='paperStyle'>
                <Grid align='center'>
                     <Avatar className='avatarStyle'><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField name='userName' label='Username' placeholder='Enter username' value={userInputs.userName} onChange={onChangeHander} className='loginInput' fullWidth required/> <br/>
                <TextField name='password' label='Password' placeholder='Enter password' value={userInputs.password} onChange={onChangeHander} className='loginInput' type='password' fullWidth required/> <br/>
                <Button onClick={submitHandler} color='primary' variant="contained" className='btnstyle' fullWidth>Sign in</Button>
            </Paper>
        </Grid>
    )
}

export default Login;
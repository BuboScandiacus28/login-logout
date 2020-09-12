import React from 'react';
import Style from './Login.module.css';
import LoginFormContainer from './LoginForm/LoginFormContainer';

const Login = ({checkSignUp}) => {

    return (
        <div className={Style.root}>
            <h1 className={Style.login_title}>
                {checkSignUp ? 'SignUp' : 'Login'}
            </h1>
            <LoginFormContainer checkSignUp = {checkSignUp}/>
        </div>
    );
};

export default Login;
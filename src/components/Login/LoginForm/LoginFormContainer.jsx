import React from 'react';
import {connect} from 'react-redux';
import LoginReduxForm from './LoginForm';
import {signUpTh, loginTh} from './../../../redux/auth-reducer';
import {Redirect} from 'react-router-dom';

const LoginContainer = ({signUpTh, loginTh, isAuth, checkSignUp}) => {
  const onSubmit = (formData) => {
    if(checkSignUp) {
      signUpTh(formData.email, formData.password);
    } else {
      loginTh(formData.email, formData.password);
    }
    
  };

  if (isAuth) return (
    <Redirect to={'/profile'}/>
  );
  
  return (
    <LoginReduxForm checkSignUp={checkSignUp} onSubmit={onSubmit} />
  );
};

let mapToStateProps = (state) => {
  return {
      isAuth: state.auth.isAuth
  };
};

export default connect(mapToStateProps, {
  signUpTh, loginTh
})(LoginContainer);

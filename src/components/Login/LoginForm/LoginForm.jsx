import React from 'react';
import Style from './LoginForm.module.css';
import { reduxForm } from 'redux-form';
import { Input, createField } from '../../common/FormControls/FormControls';
import { NavLink } from 'react-router-dom';

const LoginForm = ({ handleSubmit, checkSignUp }) => {

  return (
    <>
      <form className={Style.login_form} onSubmit={handleSubmit}>
        {createField([], Input, "email", "email", { type: "email" })}
        {createField([], Input, "password", "password", { type: "password" })}
        <button>{checkSignUp ? 'SignUp' : 'Login'}</button>
      </form>

      {checkSignUp ? <NavLink className={Style.href} to="/login">Войти в аккаунт</NavLink> : <NavLink className={Style.href} to="/signup">Зарегистрироваться</NavLink>}
    </>
  );
};

const LoginReduxForm = reduxForm({
  form: "login"
})(LoginForm);

export default LoginReduxForm;

import React from 'react';
import Style from './FormControls.module.css';
import {Field} from 'redux-form';

export const FormControl = ({input, meta, ...props}) => {
    
    const hasError = meta.touched && meta.error;

    return (
        <div className={`${Style.form_control} ${hasError ? Style.error : ''}`}>
            {props.children}
            {hasError && <p>{meta.error}</p>}
        </div>
    );
};

export const Input = (props) => {
    const {input, meta, ...restProps} = props;
    return (
        <FormControl {...props}><input {...props.input} {...restProps}></input></FormControl>
    );
};

export const createField = (validators, component, name, placeholder, props = {}) => 
    <Field  validate={validators} 
            component={component}
            name={name} 
            placeholder={placeholder} 
            {...props}
    />;


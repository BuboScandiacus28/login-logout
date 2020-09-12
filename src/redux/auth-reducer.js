import {authAPI} from "../api/api";

let initialState = {
    access_token: null,
    refresh_token: null,
    isAuth: false,
};

const SET_USER_DATA = 'SET-USER-DATA';
const SET_AUTH = 'SET-AUTH';

export const setUserData = (access_token, refresh_token) => ({
    type: SET_USER_DATA,
    tokens: {
        access_token,
        refresh_token,
    }
});

export const setAuth = (isAuth) => ({
    type: SET_AUTH,
    isAuth
});

//Thunks level

export const checkAuthTh = (access_token, refresh_token) => async (dispatch) => {
    let data = await authAPI.me(access_token);

    debugger;
    if (data.statusCode === 200) {
        dispatch(setAuth(true));
    } else {
        dispatch(refreshAuthTh(refresh_token));
    }
};

export const refreshAuthTh = (refresh_token) => async (dispatch) => {
    let data = await authAPI.refresh(refresh_token);

    debugger;
    if (data.statusCode === 200) {
        dispatch(setUserData(data.body.access_token, data.body.refresh_token));
        dispatch(checkAuthTh());
    } else {
        dispatch(setUserData(null, null));
        dispatch(setAuth(false));
    }
};

export const loginTh = (email, password) => async (dispatch) => {
    let data = await authAPI.login(email, password);

    if (data.statusCode === 200) {
        //debugger;
        dispatch(setUserData(data.body.access_token, data.body.refresh_token));
        dispatch(checkAuthTh(data.body.access_token, data.body.refresh_token));
    }
};

export const signUpTh = (email, password) => async (dispatch) => {
    let data = await authAPI.signUp(email, password);
    
    if (data.status === 'Ok') {
        //debugger;
        dispatch(loginTh(email, password));
    }
};

const authReducer = (state = initialState, action) => {
    let stateCopy;
    switch (action.type) {
        case SET_USER_DATA: {
            stateCopy = {
                ...state,
                ...action.tokens
            };
            return stateCopy;
        }
        case SET_AUTH: {
            stateCopy = {
                ...state,
                isAuth: action.isAuth
            };
            return stateCopy;
        }
        default:
            return state;
    }
};

export default authReducer;
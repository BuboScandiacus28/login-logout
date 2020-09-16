import {authAPI, refreshAccessToken} from "../api/api";

let initialState = {
    isAuth: false,
};

const SET_AUTH = 'SET-AUTH';

export const setAuth = (isAuth) => ({
    type: SET_AUTH,
    isAuth
});

//Thunks level

export const checkAuthTh = () => async (dispatch) => {
    let data = await authAPI.me();

    debugger;
    if (data.statusCode === 200) {
        dispatch(setAuth(true));
    }
};

export const loginTh = (email, password) => async (dispatch) => {
    let data = await authAPI.login(email, password);

    if (data.statusCode === 200) {
        dispatch(checkAuthTh());

        data = refreshAccessToken();
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
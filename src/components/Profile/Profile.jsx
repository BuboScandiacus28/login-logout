
import React from 'react';
import {withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';

const Profile = () => {

    return (
        <>
            Какая-то очень интересная инфомрация о пользователе
        </>
    )

}


export default compose(
    withRouter,
    withAuthRedirect
)(Profile);
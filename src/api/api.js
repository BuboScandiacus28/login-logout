import * as axios from 'axios';

let instance = axios.create({
    baseURL: "http://142.93.134.108:1111/",
});

export const authAPI = {
    me(token) {
        return instance.get(`me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }  
            })
            .then(response => {
                return (response.data);
            });
    },
    login(email, password) {
        return instance.post(`login?email=${email}&password=${password}`)
            .then(response => {

                instance.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.body.refresh_token;

                return (response.data);
            });
    },
    signUp(email, password) {
        return instance.post(`sign_up`, {
                email,
                password
            })
            .then(response => {
                return (response.data);
            });
    },
    refresh() {
        return instance.post(`refresh`, null, {})
            .then(response => {
                  
                return (response.data);
            });
    }
};

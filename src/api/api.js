import * as axios from 'axios';

const instance = axios.create({
    baseURL: "http://142.93.134.108:1111/",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});

// Response interceptor for API calls
instance.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const access_token = await refreshAccessToken();
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        return instance(originalRequest);
    }
    return Promise.reject(error);
});

export let refreshAccessToken = async () => {

    instance.interceptors.request.use(
        config => {
            config.headers.Authorization = `Bearer ${localStorage.getItem('refresh')}`;
            //debugger;
            //console.log(config);
            return config;
        },
        error => {
            Promise.reject(error)
        }
    );

    instance.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('refresh');

    console.log(localStorage.getItem('refresh'));

    let data = await authAPI.refresh();

    debugger;

    if (data.statusCode === 200) {
        return data.body.access_token;
    }
}

export const authAPI = {
    me() {
        return instance.get(`me`, {})
            .then(response => {
                return (response.data);
            });
    },
    login(email, password) {
        return instance.post(`login?email=${email}&password=${password}`)
            .then(response => {

                instance.interceptors.request.use(
                    config => {
                        const keys = response.data.body
                        config.headers.Authorization = `Bearer ${keys.access_token}`;
                        localStorage.setItem('refresh', keys.refresh_token);
                        return config;
                    },
                    error => {
                        Promise.reject(error)
                    }
                );

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
        return instance.post(`refresh`, {})
            .then(response => {
                return (response.data);
            });
    }
};
import * as axios from 'axios';

const instance = axios.create({
    baseURL: "http://142.93.134.108:1111/",
    headers: {
        //'Accept': 'application/json',
    }
});

// Response interceptor for API calls
instance.interceptors.response.use((response) => {

    if (
        (response.config.url.split('?')[0] === 'login' || response.config.url === 'refresh') &&
        ('access_token' in response.data.body)
    ) {
        const keys = response.data.body
        localStorage.setItem('refresh', keys.refresh_token);
        localStorage.setItem('access', keys.access_token);
    }

    return response
}, async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        await refreshAccessToken();
        const access_token = localStorage.getItem('access');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        return instance(originalRequest);
    }
    return Promise.reject(error);
});

instance.interceptors.request.use(
    config => {
        if (config.url === 'refresh') {
            config.headers.Authorization = `Bearer ${localStorage.getItem('refresh')}`;
        } else if (config.url === 'me') {
            config.headers.Authorization = `Bearer ${localStorage.getItem('access')}`;
        }
        //console.log(config);
        return config;
    },
    error => {
        Promise.reject(error)
    }
);

export let refreshAccessToken = async () => {

    let data = await authAPI.refresh();

    if (data.statusCode === 200) {
        localStorage.setItem('access', data.body.access_token);
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
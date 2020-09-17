import * as axios from 'axios';

const instance = axios.create({
    baseURL: "http://142.93.134.108:1111/",
    headers: {
        //'Accept': 'application/json',
    }
});

// Response interceptor for API calls
instance.interceptors.response.use( async (response) => {
    //console.log(response);
    let data = response;

    if (response.data.body.code === 1004) {
        await refreshAccessToken();
        data = await authAPI.me();
    }

    if (
        (response.config.url.split('?')[0] === 'login' || response.config.url === 'refresh') &&
        ('access_token' in response.data.body)
    ) {
        const keys = response.data.body
        localStorage.setItem('refresh', keys.refresh_token);
        localStorage.setItem('access', keys.access_token);
        //if (response.config.url.split('?')[0] === 'login') localStorage.setItem('access', 'asd'+keys.access_token);
    }

    return data
}, function (error) {
    Promise.reject(error);
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

    console.log('error');

    let data = await authAPI.refresh();

    if (data.statusCode === 200) {
        localStorage.setItem('access', data.body.access_token);
    }
}

export const authAPI = {
    me() {
        return instance.get(`me`, {})
            .then(response => {
                return (response);
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
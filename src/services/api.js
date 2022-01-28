import axios from "axios";


export const apiBaseUrl = 'https://localhost:5001/';
export const endpoints = {
    customers: apiBaseUrl + 'customers',
    login: apiBaseUrl + 'auth/login',
    register: apiBaseUrl + 'auth/register',
    products: apiBaseUrl + 'products',
    orders: apiBaseUrl + 'orders'
}
export const setAuthToken = () => {
    let token = localStorage.getItem('token');
    if (token === undefined) {
        axios.defaults.headers.common['Authorization'] = '';
    } else {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    }
}

axios.defaults.baseURL = apiBaseUrl;


export const login = async (pw, mail) => {
    return await axios.post(endpoints.login, {  
        Email: mail,
        Password: pw
    }).then((res) => {
        return res.data
    }).catch((err) => console.error(err))
        .finally(() => {
            setAuthToken()
        })
}

export const getAll = async (endpoint) => {
    setAuthToken()
    return await axios.get(endpoint).then(res => res.data)
        .catch(() => []);
}

export const getOne = async (endpoint, id) => {
    setAuthToken()
    return await axios.get(endpoint + "/" + id).then(res => res.data)
        .catch(() => null);
}

export const deleteById = async (endpoint, id) => {
    setAuthToken()
    return await axios.delete(endpoint + "/" + id).then(res => res.data)
        .catch(() => null);
}

export const updateById = async (endpoint, id, payload) => {
    setAuthToken()
    return await axios.put(endpoint + "/" + id, payload).then(res => res.data)
        .catch(() => null);
}

export const create = async (endpoint, payload) => {
    setAuthToken()
    return await axios.post(endpoint, payload).then(res => res.data)
        .catch(() => null);
}

export const createReturnsResponse = async (endpoint, payload) => {
    setAuthToken()
    return await axios.post(endpoint, payload)
        .then(result => result)
        .catch((error) => error.response);
}

export const register = async (user) => {
    setAuthToken()
    return await axios.post(endpoints.register, user).then((response) => {
        return response
    }).catch((err) => err.response)
}

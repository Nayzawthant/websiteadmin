import axios from "axios";
import { API_URL } from "../../config/constant";

const API_URLS = API_URL + "v1/auth/";

const register = (name, email, password) => {
    return axios.post(API_URLS + "register", {
        name,
        email,
        password
    });
};

const login = (email, password) => {
    return axios.post(API_URLS + 'login', {
        email,
        password,
    })
    .then((response) => {
        console.log(response)
        if (response.data.tokens) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem('user');
}

const authService = {
    register,
    login,
    logout
}

export default authService;
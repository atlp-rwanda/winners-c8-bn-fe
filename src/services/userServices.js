import axios from "axios";
const apiUrl = 'https://winners-c8-bn-be-staging.herokuapp.com/api'

function register(user) {
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            firstName:user.firstName,
            lastName:user.lastName,
            email: user.email,
            password: user.password
        })
    };

    return fetch(`${apiUrl}/auth/register`, requestOptions).then((handleResponse)=>{
        
        return handleResponse.json()
    });
}

export const userService = {
    register,
};
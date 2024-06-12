import axios from "axios"

const api = axios.create({

    baseURL: import.meta.env.VITE_API_LOCALHOST_URL, // Backend Server of the API
    headers: {
        'Content-Type': 'application/json',
    },
})


export const login = async(data: {email: string, password: string}) => {
    return api.post('/api/users/login',data)
}



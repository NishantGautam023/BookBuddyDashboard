import axios from "axios"
import useTokenStore from "@/store.ts";

const api = axios.create({

    baseURL: import.meta.env.VITE_API_LIVEHOST_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use((config) => {
    const token = useTokenStore.getState().token

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})




export const login = async (data: { email: string, password: string }) => {
    return api.post('/api/users/login', data)
}


export const register = async (data: { name: string, email: string, password: string }) => {
    return api.post('/api/users/register', data)
}


export const getBooks = async () => {
    return api.get('/api/books')
}

export const createBook = async (data: FormData) =>
    api.post('/api/books', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    });




// Function to delete a book by ID
export const deleteBook = async (bookId: string) => {
    try {
        const response = await api.delete(`/api/books/${bookId}`);
        if (response.status === 204) {
            return { success: true, message: "Book deleted successfully" };
        }
        throw new Error("Unexpected response status");
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || "Failed to delete book");
        }
        throw new Error("Failed to delete book");
    }
};
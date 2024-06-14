import LoginPage from "./src/pages/LoginPage";
import HomePage from "./src/pages/HomePage";
import RegisterPage from "@/pages/RegisterPage.tsx";
import {createBrowserRouter} from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout.tsx";
import BooksPage from "@/pages/BooksPage.tsx";
import AuthLayout from "@/layouts/AuthLayout.tsx";
import CreateBook from "@/pages/CreateBook.tsx";

// @ts-ignore
export const router = new createBrowserRouter([
    {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
            {
                path: 'home',
                element: <HomePage />,
            },
            {
                path: 'books',
                element: <BooksPage />,
            },
            {
                path: "books/create",
                element: <CreateBook />,
            }
        ]

    },

    {
      path: '/auth',
      element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'register',
                element: <RegisterPage />,
            }
        ]
    },

    {
        path: "/login",
        element: <LoginPage />,
    },

    {
        path: "/register",
        element: <RegisterPage />
    }
]);

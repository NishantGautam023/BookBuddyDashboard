import LoginPage from "./src/pages/LoginPage";
import HomePage from "./src/pages/HomePage";
import RegisterPage from "@/pages/RegisterPage.tsx";
import {createBrowserRouter} from "react-router-dom";

// @ts-ignore
export const router = new createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
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

import LoginPage from "./src/pages/LoginPage";
import HomePage from "./src/pages/HomePage";

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
    }
]);

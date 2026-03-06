import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import BookDetails from "../pages/BookDetail";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import AdminPage from "../pages/AdminPage";
import ProtectedRoutes from "./ProtectedRoutes";

export const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/book/:id", element: <BookDetails /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignupPage /> },
    // Protected routes for logged in user
    { path: "/admin", element: <ProtectedRoutes><AdminPage /></ProtectedRoutes> }
])

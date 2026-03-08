import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import BookDetails from "../pages/BookDetailPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import AdminPage from "../pages/AdminPage";
import ProtectedRoutes from "./ProtectedRoutes";
import LayoutPage from "../pages/LayoutPage";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutPage />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/book/:id", element: <BookDetails /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/signup", element: <SignupPage /> },
            // Protected routes for logged in user
            { path: "/admin", element: <ProtectedRoutes><AdminPage /></ProtectedRoutes> }
        ]
    }
]);

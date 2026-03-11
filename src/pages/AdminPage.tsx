import { useAuth } from "../context/AuthContext";
import AdminReviews from "../components/AdminReviews";
import "./AdminPage.css";

function AdminPage() {
    const { user } = useAuth();

    return(
        <main className="admin-page">
                <h1>Welcome {user?.displayName}!</h1>
                <p className="admin-subtitle">Manage your book reviews here</p>

                <AdminReviews />
        </main>
    )
}

export default AdminPage;
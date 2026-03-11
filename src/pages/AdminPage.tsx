import AdminReviews from "../components/AdminReviews";
import "./AdminPage.css";

function AdminPage() {
    return(
        <main className="admin-page">
                <h1>Admin Panel</h1>
                <p className="admin-subtitle">Manage your reviews here</p>

                <AdminReviews />
        </main>
    )
}

export default AdminPage;
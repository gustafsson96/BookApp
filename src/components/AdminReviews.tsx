import { useEffect, useState } from "react";
import type { Review } from "../types/Review";
import { getMyReviews } from "../services/reviewService";
import "./AdminReviews.css";

function AdminReviews() {
    // State for a created review
    const [reviews, setReviews] = useState<Review[]>([]);

    // States for error messages and loading
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    // Fetch when component loads
    useEffect(() => {
        const fetchReviews = async () => {
            // Get token from localStorage
            const token = localStorage.getItem("jwtToken");

            if (!token) {
                setError("You must be logged in to see your reviews.");
                setLoading(false);
                return;
            }

            // Use function from reviewService to fetch reviews
            try {
                const data = await getMyReviews(token);
                setReviews(data);
            } catch (err) {
                setError("Failed to load reviews");
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    if (loading) return <p>Loading reviews...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <section className="admin-reviews">

                <h2>My Reviews</h2>

                {reviews.length === 0 ? (
                    <p>You haven't written any reviews yet.</p>
                ) : (
                    <ul className="reviews-list">
                        {reviews.map((review) => (
                            <li key={review.id} className="review-item">

                                <p><strong>Book ID:</strong> {review.bookId}</p>

                                <p>
                                    <strong>Rating:</strong> {review.rating}/5
                                </p>

                                <p className="review-text">
                                    {review.text}
                                </p>

                                <p className="review-date">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </p>

                            </li>
                        ))}
                    </ul>
                )}

            </section>
        </>
    )
}

export default AdminReviews;
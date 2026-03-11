import { useEffect, useState } from "react";
import type { Review } from "../types/Review";
import { getMyReviews, updateReview, deleteReview } from "../services/reviewService";
import { ClipLoader } from "react-spinners";
import "./AdminReviews.css";

function AdminReviews() {
    // State for a created review
    const [reviews, setReviews] = useState<Review[]>([]);

    // States for edit mode
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editText, setEditText] = useState("");
    const [editRating, setEditRating] = useState(1);

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

    // Enter edit mode for selected review
    const handleEditClick = (review: Review) => {
        setEditingId(review.id);
        setEditText(review.text);
        setEditRating(review.rating);
        setError("");
    };

    // Cancel edit mode
    const handleCancelEdit = () => {
        setEditingId(null);
        setEditText("");
        setEditRating(1);
    };

    // Save updated review
    const handleUpdate = async (id: number) => {
        const token = localStorage.getItem("jwtToken");

        if (!token) {
            setError("You must be logged in.");
            return;
        }

        try {
            const updatedReview = await updateReview(id, editText, editRating, token);

            setReviews((prevReviews) =>
                prevReviews.map((review) =>
                    review.id === id ? updatedReview : review
                )
            );

            handleCancelEdit();
        } catch (err) {
            setError("Failed to update review.");
        }
    };

    // Delete selected review
    const handleDelete = async (id: number) => {
        const token = localStorage.getItem("jwtToken");

        if (!token) {
            setError("You must be logged in.");
            return;
        }

        const confirmed = window.confirm("Are you sure you want to delete this review?");
        if (!confirmed) return;

        try {
            await deleteReview(id, token);

            setReviews((prevReviews) =>
                prevReviews.filter((review) => review.id !== id)
            );
        } catch (err) {
            setError("Failed to delete review.");
        }
    };

    if (loading) return <p>Loading reviews...</p>;
    if (error) return <p>{error}</p>;

    return (
        <section className="admin-reviews">
            <h2>My Reviews</h2>
            {loading && <ClipLoader />}
            {reviews.length === 0 ? (
                <p>You haven't written any reviews yet.</p>
            ) : (
                <ul className="reviews-list">
                    {reviews.map((review) => (
                        <li key={review.id} className="review-item">
                            <p><strong>Book ID:</strong> {review.bookId}</p>

                            {editingId === review.id ? (
                                <>
                                    <label htmlFor={`rating-${review.id}`}>Rating</label>
                                    <input
                                        id={`rating-${review.id}`}
                                        type="number"
                                        min="1"
                                        max="5"
                                        value={editRating}
                                        onChange={(e) => setEditRating(Number(e.target.value))}
                                    />

                                    <label htmlFor={`text-${review.id}`}>Review</label>
                                    <textarea
                                        id={`text-${review.id}`}
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                    />

                                    <div className="review-buttons">
                                        <button onClick={() => handleUpdate(review.id)}>
                                            Save
                                        </button>
                                        <button onClick={handleCancelEdit}>
                                            Cancel
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p>
                                        <strong>Rating:</strong> {review.rating}/5
                                    </p>

                                    <p className="review-text">
                                        {review.text}
                                    </p>

                                    <p className="review-date">
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </p>

                                    <div className="review-buttons">
                                        <button onClick={() => handleEditClick(review)}>
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(review.id)}>
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default AdminReviews;
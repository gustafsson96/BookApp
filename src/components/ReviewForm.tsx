import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createReview } from "../services/reviewService";
import type { Review } from "../types/Review";
import "./ReviewForm.css";

interface ReviewFormProps {
    bookId: string;
    onReviewCreated: (newReview: Review) => void;
}

function ReviewForm({ bookId, onReviewCreated }: ReviewFormProps) {
    // Get current logged in user from auth context
    const { user } = useAuth();

    // State for review text
    const [text, setText] = useState("");

    // State for rating
    const [rating, setRating] = useState("");

    // State for error message
    const [error, setError] = useState<string | null>(null);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Get JWT token from localStorage
        const token = localStorage.getItem("jwtToken");

        // Stop if user is not logged in or token is missing
        if (!user || !token) {
            setError("You must be logged in to create a review.");
            return;
        }

        try {
            // Clear previous error
            setError(null);

            // Create review through backend API
            const newReview = await createReview(
                bookId,
                text,
                Number(rating),
                token
            );

            // Add new review to parent component
            onReviewCreated(newReview);

            // Clear form fields after successful submission
            setText("");
            setRating("");
        } catch (err) {
            console.error(err);
            setError("Failed to create review.");
        }
    };

    // Show message instead of form if user is not logged in
    if (!user) {
        return (
            <div className="review-login-message">
                <p>
                    <Link to="/login">Log in</Link> or{" "}
                    <Link to="/signup">sign up</Link> to start creating reviews.
                </p>
            </div>
        );
    }

    return (
        <form className="review-form" onSubmit={handleSubmit}>
            <h3>Write a review</h3>

            <label htmlFor="rating">Rating</label>
            <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
            >
                <option value="">Select rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>

            <label htmlFor="reviewText">Review</label>
            <textarea
                id="reviewText"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your thoughts about this book..."
                required
            />

            <button type="submit">Submit review</button>

            {error && <p className="review-error">{error}</p>}
        </form>
    );
}

export default ReviewForm;
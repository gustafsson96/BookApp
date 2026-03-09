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

    // States for error messages
    const [textError, setTextError] = useState("");
    const [ratingError, setRatingError] = useState("");
    const [apiError, setApiError] = useState("");

    // Validate each input field
    const validateForm = () => {
        let valid = true;

        setTextError("");
        setRatingError("");
        setApiError("");

        if (!rating) {
            setRatingError("Please select a rating");
            valid = false;
        }

        if (!text.trim()) {
            setTextError("Please write a review");
            valid = false;
        }

        return valid;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Get JWT token from localStorage
        const token = localStorage.getItem("jwtToken");

        // Stop if user is not logged in or token is missing
        if (!user || !token) {
            setApiError("You must be logged in to create a review.");
            return;
        }

        const isValid = validateForm();
        if (!isValid) return;
        try {
            const newReview = await createReview(
                bookId,
                text.trim(),
                Number(rating),
                token
            );

            onReviewCreated(newReview);

            setText("");
            setRating("");
            setTextError("");
            setRatingError("");
            setApiError("");
        } catch (err: any) {
            console.error(err);

            if (err.response?.status === 400) {
                setApiError("Invalid review data. Please check your input.");
            } else if (err.response?.status === 401) {
                setApiError("You must be logged in to create a review.");
            } else if (err.response?.status >= 500) {
                setApiError("Server error. Please try again later.");
            } else {
                setApiError("Failed to create review.");
            }
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
        <form className="review-form" onSubmit={handleSubmit} noValidate>
            <h3>Write a review</h3>

            <label htmlFor="rating">Rating</label>
            <select
                id="rating"
                value={rating}
                onChange={(e) => {
                    setRating(e.target.value);
                    setRatingError("");
                    setApiError("");
                }}
            >
                <option value="">Select rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            {ratingError && <p className="review-error">{ratingError}</p>}

            <label htmlFor="reviewText">Review</label>
            <textarea
                id="reviewText"
                value={text}
                onChange={(e) => {
                    setText(e.target.value);
                    setTextError("");
                    setApiError("");
                }}
                placeholder="Write your thoughts about this book..."
            />
            {textError && <p className="review-error">{textError}</p>}

            <button type="submit">Submit review</button>

            {apiError && <p className="review-error">{apiError}</p>}
        </form>
    );
}

export default ReviewForm;
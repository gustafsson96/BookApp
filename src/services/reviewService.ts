import type { Review } from "../types/Review";

const REVIEW_API_URL = "http://localhost:5252/api/reviews";

// Fetch all reviews for a specific book
export const getReviewsByBookId = async (bookId: string): Promise<Review[]> => {
    const response = await fetch(`${REVIEW_API_URL}/book/${bookId}`);

    if (!response.ok) {
        throw new Error("Failed to fetch reviews.");
    }

    return response.json();
};

// Fetch logged in user's own reviews
export const getMyReviews = async (token: string): Promise<Review[]> => {
    const response = await fetch(`${REVIEW_API_URL}/myreviews`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch your reviews.");
    }

    return response.json();
};

// Create a new review
export const createReview = async (
    bookId: string,
    text: string,
    rating: number,
    token: string
): Promise<Review> => {
    const response = await fetch(REVIEW_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            bookId,
            text,
            rating
        })
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to create review.");
    }

    return response.json();
};

// Update a review
export const updateReview = async (
    id: number,
    text: string,
    rating: number,
    token: string
): Promise<Review> => {
    const response = await fetch(`${REVIEW_API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            text,
            rating
        })
    });

    if (!response.ok) {
        throw new Error("Failed to update review.");
    }

    return response.json();
};

// Delete a review
export const deleteReview = async (
    id: number,
    token: string
): Promise<void> => {
    const response = await fetch(`${REVIEW_API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to delete review.");
    }
};
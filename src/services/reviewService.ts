import type { Review } from "../types/Review";

const REVIEW_API_URL = "http://localhost:5252/api/reviews";

// Fetch all reviews for a specific book
export const getReviewsByBookId = async (bookId: string): Promise<Review[]> => {
    const response = await fetch(`${REVIEW_API_URL}/book/${bookId}`);

    if (!response.ok) {
        throw new Error("Failed to fetch reviews.");
    }

    return await response.json();
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
        throw new Error("Failed to create review.");
    }

    return await response.json();
};
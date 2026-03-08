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
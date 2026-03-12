import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookById } from "../services/googleBookService";
import type { Book } from "../types/Book";
import type { Review } from "../types/Review";
import "./BookDetailPage.css";
import { getReviewsByBookId } from "../services/reviewService";
import { ClipLoader } from "react-spinners";
import ReviewForm from "../components/ReviewForm";

function BookDetailPage() {
    // Get book id from the URL
    const { id } = useParams<{ id: string }>();

    // Hook to navigate back 
    const navigate = useNavigate();

    // States for storing selected book and reviews
    const [book, setBook] = useState<Book | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);

    // States for error messages and loading
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch book by id 
    useEffect(() => {
        const fetchBookAndReviews = async () => {
            if (!id) {
                setError("No book id found.");
                setLoading(false);
                return;
            }
            try {
                setError(null);
                setLoading(true);

                const bookResult = await getBookById(id);
                const reviewResult = await getReviewsByBookId(id);

                setBook(bookResult);
                setReviews(reviewResult);
            } catch (err) {
                console.error(err);
                setError("Something went wrong while fetching book details.");
            } finally {
                setLoading(false);
            }
        };

        // Run fetch function when component loads
        fetchBookAndReviews();
    }, [id]);

    if (loading) {
        return (
            <div className="book-detail-page state-message">
                <ClipLoader size={30} />
                <p>Loading book details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="book-detail-page state-message">
                <p className="page-error">{error}</p>
                <button className="back-button" onClick={() => navigate(-1)}>
                    ← Back
                </button>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="book-detail-page state-message">
                <p>Book not found.</p>
                <button className="back-button" onClick={() => navigate(-1)}>
                    ← Back
                </button>
            </div>
        );
    }

    return (
        <div className="book-detail-page">
            <button className="back-button" onClick={() => navigate(-1)}>
                ← Back
            </button>
            <div className="book-detail-card">
                <div className="book-detail-image">
                    {book.largeImage || book.smallImage ? (
                        <img
                            src={book.largeImage || book.smallImage}
                            alt={book.title}
                        />
                    ) : (
                        <div className="no-image">No image available</div>
                    )}
                </div>

                <div className="book-detail-info">
                    <h1>{book.title}</h1>

                    {book.authors && (
                        <p><strong>Author:</strong> {book.authors.join(", ")}</p>
                    )}

                    {book.publisher && (
                        <p><strong>Publisher:</strong> {book.publisher}</p>
                    )}

                    {book.publishedDate && (
                        <p><strong>Published:</strong> {book.publishedDate}</p>
                    )}

                    {book.pageCount && (
                        <p><strong>Pages:</strong> {book.pageCount}</p>
                    )}

                    {book.categories && (
                        <p><strong>Categories:</strong> {book.categories.join(", ")}</p>
                    )}

                    {book.description && (
                        <div className="book-description">
                            <h2>Description</h2>
                            <div
                                // Render HTML tags from Google Books API for description
                                dangerouslySetInnerHTML={{ __html: book.description }}
                            />
                        </div>
                    )}
                </div>
            </div>

            <section className="reviews-section">
                <h2>Reviews</h2>

                {id && (
                    <ReviewForm
                        bookId={id}
                        bookTitle={book.title}
                        bookImage={book.smallImage || book.largeImage || ""}
                        onReviewCreated={(newReview) =>
                            setReviews((prevReviews) => [newReview, ...prevReviews])
                        }
                    />
                )}

                {reviews.length === 0 ? (
                    <p>No reviews yet.</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className="review-card">
                            <p><strong>{review.displayName}</strong></p>
                            <p><strong>Rating:</strong> {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</p>
                            <p>{review.text}</p>
                            <p className="review-date">
                                {new Date(review.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    ))
                )}
            </section>
        </div>
    )
}

export default BookDetailPage;
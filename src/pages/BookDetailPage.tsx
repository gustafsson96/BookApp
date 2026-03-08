import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookById } from "../services/googleBookService";
import type { Book } from "../types/Book";
import "./BookDetailPage.css";

function BookDetailPage() {
    // Get book id from the URL
    const { id } = useParams<{ id: string }>();

    // Hook to navigate back 
    const navigate = useNavigate();

    // States for storing selected book, error messages and loading
    const [book, setBook] = useState<Book | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch book by id 
    useEffect(() => {
        const fetchBook = async () => {
            if (!id) {
                setError("No book id found.");
                setLoading(false);
                return;
            }
            try {
                setError(null);
                const result = await getBookById(id);
                setBook(result);
            } catch (err) {
                console.error(err);
                setError("Something went wrong while fetching book details.");
            } finally {
                setLoading(false);
            }
        };

        // Run fetch function when component loads
        fetchBook();
    }, [id]);

    // Replace with animation later
    if (loading) return <p>Loading book details...</p>;
    if (error) return <p>{error}</p>;
    if (!book) return <p>Book not found.</p>;


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
                <p>Placeholder section to display reviews</p>
            </section>
        </div>
    )
}

export default BookDetailPage;
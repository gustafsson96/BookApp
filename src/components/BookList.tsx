import { useEffect, useState } from "react";
import { searchBooks } from "../services/googleBookService";
import type { Book } from "../types/Book";
import { NavLink } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import "./BookList.css";

function BookList() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const result = await searchBooks("subject:romance");
                setBooks(result);
            } catch (err) {
                console.error(err);
                setError("Failed to load books.");
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) {
        return (
            <section className="book-list">
                <div className="book-list-state">
                    <ClipLoader size={35} />
                </div>
            </section>
        );
    }
    
    if (error) {
        return (
            <section className="book-list">
                <p className="book-list-state">{error}</p>
            </section>
        );
    }

    return (
        <section className="book-list">
            <h2>Popular right now:</h2>

            <div className="book-list-grid">
                {books.map((book) => (
                    <NavLink
                        key={book.id}
                        to={`/book/${book.id}`}
                        className="book-list-card"
                    >
                        {book.smallImage ? (
                            <img
                                src={book.smallImage}
                                alt={book.title}
                                className="book-list-image"
                            />
                        ) : (
                            <div className="book-list-no-image">No image</div>
                        )}

                        <div className="book-list-info">
                            <h3>{book.title}</h3>
                            {book.authors && <p>{book.authors.join(", ")}</p>}
                        </div>
                    </NavLink>
                ))}
            </div>
        </section>
    );
}

export default BookList;
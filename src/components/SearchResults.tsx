import { Link } from "react-router-dom";
import type { Book } from "../types/Book";
import "./SearchResults.css";

function SearchResults({ books }: { books: Book[] }) {
    return (
        // Render search results as cards
        <div className="search-results">
            {books.map((book) => (
                <Link key={book.id} to={`/book/${book.id}`} className="book-card">
                    {/* Show book cover if it exists */}
                    {book.smallImage && (
                        <img 
                            src={book.smallImage} 
                            alt={book.title} 
                            className="book-image"
                        />
                    )}
                    <div className="book-info">
                        <h3>{book.title}</h3>
                        {book.authors && <p>{book.authors.join(", ")}</p>}
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default SearchResults;
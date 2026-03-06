import type { Book } from "../types/Book";
import "./SearchResults.css";

function SearchResults({ books }: { books: Book[] }) {
    return (
        // Render search results as cards
        <div className="search-results">
            {books.map((book) => (
                <div key={book.id} className="book-card">
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
                </div>
            ))}
        </div>
    )
}

export default SearchResults;
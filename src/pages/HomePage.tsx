import { useState } from "react";
import { searchBooks } from "../services/googleBookService";
import type { Book } from "../types/Book";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import BookList from "../components/BookList";
import { ClipLoader } from "react-spinners";
import "./HomePage.css";

function HomePage() {
    // States for search result and error messages
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    // State for search query
    const [searchQuery, setSearchQuery] = useState("");

    // Handle a book search
    const handleSearch = async (query: string) => {
        setSearchQuery(query);
        // Check if query is empty
        if (!query.trim()) {
            setBooks([]);
            setError("Please enter a search term");
            setHasSearched(false);
            return;
        }
        try {
            setLoading(true);
            setError(null);
            setHasSearched(true);

            // Fetch books and save results in state
            const results = await searchBooks(query);
            setBooks(results);
        } catch (err) {
            // Display error message if fetch call is unsuccessful
            setError("Something went wrong");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }
    return (
        <main className="home-page">
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to Book Club</h1>
                    <p className="hero-subtitle">
                        Find your next favorite book and read what other people think.
                    </p>
                    <div className="searchbar-wrapper">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                    {error && <p className="error">{error}</p>}
                </div>
            </section>

            {loading && (
                <div className="loader-wrapper">
                    <ClipLoader size={35} />
                </div>
            )}

            {!hasSearched && !loading && <BookList />}

            {hasSearched && !loading && (
                <section className="results-section">

                    {books.length === 0 ? (
                        <p className="no-results">
                            No books found for {searchQuery}
                        </p>
                    ) : (
                        <>

                    <p className="results-count">
                        <strong>Search result:</strong> {books.length} {books.length === 1 ? "book" : "books"} found for "{searchQuery}"
                    </p>

                    <SearchResults books={books} />
                    
                    </>
                    )}
                </section>
            )}
        </main>
    );
};

export default HomePage;
import { useState } from "react";
import { searchBooks } from "../services/googleBookService";
import type { Book } from "../types/Book";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import { ClipLoader } from "react-spinners";
import "./HomePage.css";

function HomePage() {
    // States for search result and error messages
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Handle a book search
    const handleSearch = async (query: string) => {
        // Check if query is empty
        if (!query.trim()) {
            setBooks([]);
            setError("Please enter a search term");
            return;
        }
        try {
            // Set loading to true
            setLoading(true);
            // Remove previous errors
            setError(null);
            // Fetch books from API
            const results = await searchBooks(query);
            // Save results in state
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
        <div>
            <h1>Search Books</h1>

            <SearchBar onSearch={handleSearch} />

            {error && <p>{error}</p>}
            <SearchResults books={books} />
            {loading && <ClipLoader />}
        </div>
    );
};

export default HomePage;
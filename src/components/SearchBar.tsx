import { useState } from "react";
import type { SyntheticEvent } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
    // State for input field
    const [query, setQuery] = useState("");

    // Handle form submission
    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <>
            <form className="search-form" onSubmit={handleSubmit}>
                <input
                    className="search-input"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a book..." />
                <button className="search-button" type="submit">Search</button>
            </form>
        </>
    )
}

export default SearchBar;
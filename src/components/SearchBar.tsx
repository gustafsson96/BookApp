import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
    // State for input field
    const [query, setQuery] = useState("");

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a book..." />
                <button type="submit">Search</button>
            </form>
        </>
    )
}

export default SearchBar;
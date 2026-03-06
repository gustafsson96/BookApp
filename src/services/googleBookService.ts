import type { Book } from "../types/Book";
import type { GoogleBook } from "../types/GoogleBook";

const API_URL = "https://www.googleapis.com/books/v1/volumes";

export const searchBooks = async (query: string): Promise<Book[]> => {
    const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
    const api = `${API_URL}?q=${encodeURIComponent(query)}&key=${apiKey}`;

    const response = await fetch(api);

    if (!response.ok) {
        throw new Error("Failed to fetch books from API.")
    }

    const data = await response.json();

    // Empty array as fallback
    const items: GoogleBook[] = data.items ?? [];

    // Map Google Book to Book interface
    return items.map((item) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        description: item.volumeInfo.description,
        smallImage: item.volumeInfo.imageLinks?.thumbnail,
        largeImage: item.volumeInfo.imageLinks?.large,
    }));
}
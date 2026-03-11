export interface Review {
    id: number;
    bookId: string;
    userId: string;
    bookTitle: string;
    bookImage?: string;
    text: string;
    rating: number;
    createdAt: string;
    displayName: string;
}
export interface Book {
    id: string;
    title: string;
    author?: string;
    description?: string;
    publishedDate?: string;
    smallImage?: string;
    largeImage?: string;
}
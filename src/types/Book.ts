export interface Book {
    id: string;
    title: string;
    description?: string;
    authors?: string[];
    smallImage?: string;
    largeImage?: string;
    categories?: string[];
    pageCount?: number;
    publisher?: string;
    publishedDate?: string;
  }
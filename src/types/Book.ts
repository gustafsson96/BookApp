export interface Book {
    id: string;
    title: string;
    authors?: string[];
    smallImage?: string;
    largeImage?: string;
    description?: string;
  }
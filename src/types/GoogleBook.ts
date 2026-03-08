export interface GoogleBook {
    id: string;
    volumeInfo: {
      title: string;
      description?: string;
      authors?: string[];
      categories?: string[];
      pageCount?: number;
      publisher?: string;
      publishedDate?: string;
      imageLinks?: {
        thumbnail?: string;
        large?: string;
      }
    }
  }
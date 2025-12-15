/**
 * Publication API Types
 *
 * Định nghĩa types cho Publications API response
 */

// Publisher interface
export interface Publisher {
  id: number;
  publisherName: string;
  address: string;
  createdAt: string | null;
  updatedAt: string | null;
}

// Author interface
export interface Author {
  id: number;
  authorName: string;
  biography: string;
  dateOfBirth: string;
  dateOfDeath: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

// Category interface
export interface Category {
  id: number;
  categoryName: string;
  parentCategoryId: number | null;
  parentCategoryName: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

// Tag interface
export interface Tag {
  id: number;
  tagName: string;
  createdAt: string | null;
  updatedAt: string | null;
}

// Publication interface (Main entity)
export interface Publication {
  id: number;
  isbn: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  language: string;
  numberOfPages: number;
  publisher: Publisher;
  authors: Author[];
  publicationYear: number;
  edition: string | null;
  coverImageUrl: string | null;
  size: string | null;
  weight: number | null;
  categories: Category[];
  tags: Tag[];
  totalItems: number;
  availableItems: number;
  createdAt: string | null;
  updatedAt: string | null;
}

// API Response wrapper
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// Paginated response for publications
export interface PaginatedPublications {
  content: Publication[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

// Query parameters for getting publications
export interface GetPublicationsParams {
  keyword?: string;
  sortBy?: 'createdAt' | 'title' | 'publicationYear' | 'updatedAt';
  direction?: 'ASC' | 'DESC';
  page?: number;
  size?: number;
}

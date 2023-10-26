import { User } from "./user";

export interface ArticlesParams {
  tag?: string;
  author?: string;
  favorite?: string;
  limit?: number;
  offset?: number;
}

export interface Article {
  author: User;
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: Array;
  title: string;
  updatedAt: string;
}

export interface ResponseTags {
  tags: Array;
}

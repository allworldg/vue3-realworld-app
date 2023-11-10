import { User } from "./user";

export interface ArticlesParams {
  tag?: string;
  author?: string;
  favorited?: string;
  limit?: number;
  offset?: number;
}

export interface Article {
  author: Profile;
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: Array<string>;
  title: string;
  updatedAt: string;
}

export interface ResponseTags {
  tags: Array;
}

export interface ResponseArticles {
  article: Article;
}
export interface ResponseArticles {
  articles: Array<Article>;
  articlesCount: number;
}

export interface ResponseArticle {
  article: Article;
}

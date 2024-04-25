import requests from "@/utils/requests";
import {
  ArticlesParams,
  UpdateArticle,
  RequestComment,
  ResponseArticle,
  ResponseArticles,
  ResponseComment,
  ResponseComments,
  ResponseTags,
} from "@/types/articles";
import { TAGS, ARTICLES, FEED, FAVORITE, COMMENTS } from "@/common/url";

export function getArticle(slug: string): Promise<ResponseArticle> {
  return requests({
    method: "get",
    url: `${ARTICLES}/${slug}`,
  });
}

export function getArticles(params: ArticlesParams): Promise<ResponseArticles> {
  return requests({
    method: "get",
    url: ARTICLES,
    data: {},
    params,
  });
}

export function addArticle(article: UpdateArticle): Promise<ResponseArticle> {
  return requests({
    method: "post",
    url: `${ARTICLES}`,
    data: {
      article,
    },
  });
}

export function updateArticle(article: UpdateArticle, slug: string): Promise<ResponseArticle> {
  return requests({
    method: "put",
    url: `${ARTICLES}/${slug}`,
    data: {
      article,
    },
  });
}

export function getFeedArticles(params: ArticlesParams): Promise<ResponseArticles> {
  return requests({
    method: "get",
    url: FEED,
    params,
  });
}

export function getTagArticles(params: ArticlesParams): Promise<ResponseArticles> {
  return requests({
    method: "get",
    url: ARTICLES,
    params,
  });
}

export function addFavoriteArticle(slug: string): Promise<ResponseArticle> {
  return requests({
    method: "post",
    url: `${ARTICLES}/${slug}/${FAVORITE}`,
  });
}

export function unFavoriteArticle(slug: string): Promise<ResponseArticle> {
  return requests({
    method: "delete",
    url: `${ARTICLES}/${slug}/${FAVORITE}`,
  });
}

export function getTags(): Promise<ResponseTags> {
  return requests({
    method: "get",
    url: TAGS,
  });
}

export function deleteArticle(slug: string): Promise<any> {
  return requests({
    method: "delete",
    url: `${ARTICLES}/${slug}`,
  });
}

export function getComments(slug: string): Promise<ResponseComments> {
  return requests({
    method: "get",
    url: `${ARTICLES}/${slug}/${COMMENTS}`,
  });
}

export function postComment(comment: RequestComment, slug: string): Promise<ResponseComment> {
  return requests({
    method: "post",
    url: `${ARTICLES}/${slug}/${COMMENTS}`,
    data: {
      comment,
    },
  });
}

export function deleteComment(id: number, slug: string): Promise<void> {
  return requests({
    method: "delete",
    url: `${ARTICLES}/${slug}/${COMMENTS}/${id}`,
  });
}

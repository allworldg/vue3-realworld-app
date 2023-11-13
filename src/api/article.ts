import requests from "@/utils/requests";
import { ArticlesParams, ResponseArticle, ResponseArticles, ResponseTags } from "@/types/articles";
import { TAGS, ARTICLES, FEED, FAVORITE } from "@/common/url";
import { request } from "http";

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

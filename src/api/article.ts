import requests from "@/utils/requests";
import { ArticlesParams, ResponseArticles, ResponseTags } from "@/types/articles";
import { TAGS, ARTICLES, FEED } from "@/common/url";

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

export function getTags(): Promise<ResponseTags> {
  return requests({
    method: "get",
    url: TAGS,
  });
}

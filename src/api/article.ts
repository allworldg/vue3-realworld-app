import requests from "@/utils/requests";
import {
  ArticlesParams,
  ResponseArticles,
  ResponseTags,
} from "@/types/articles";
import { GET_TAGS, REQUEST_ARTICLES } from "@/common/url";

export function getArticles(params: ArticlesParams): Promise<ResponseArticles> {
  return requests({
    method: "get",
    url: REQUEST_ARTICLES,
    data: {},
    params,
  });
}

export function getTags(): Promise<ResponseTags> {
  return requests({
    method: "get",
    url: GET_TAGS,
  });
}

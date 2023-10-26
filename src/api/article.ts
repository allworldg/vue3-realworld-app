import requests from "@/utils/requests";
import { Article, ArticlesParams } from "@/types/articles";
import { REQUEST_ARTICLES } from "@/common/url";

export function getArticles(params: ArticlesParams): Promise<Array<Article>> {
  return requests({
    method: "get",
    url: REQUEST_ARTICLES,
    data: {},
    params,
  });
}

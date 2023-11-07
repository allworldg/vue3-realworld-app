<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="userStore.getIsLogined" class="nav-item">
                <a href="" class="nav-link" :class="{ active: curArticleTypes === FEED }">
                  Your Feed
                </a>
              </li>
              <li class="nav-item">
                <a
                  href=""
                  class="nav-link"
                  :class="{ active: curArticleTypes === GLOBAL }"
                  @click.prevent="handleGetGlobalArticles"
                >
                  Global Feed
                </a>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-if="loading_articles">Loading articles...</div>
          <div v-else>
            <Articles :articles="articles"></Articles>
          </div>
          <div v-show="isShowPage">
            <AppPagination
              :pages="pages"
              :cur-page="curPage"
              @change-page="changePage"
            ></AppPagination>
          </div>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div v-if="loading_tags">Loading tags...</div>
            <div v-else class="tag-list">
              <a href="" v-for="tag in tags" class="tag-pill tag-default">
                {{ tag }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getArticles, getTags, getFeedArticles } from "@/api/article";
import { Article, ArticlesParams } from "@/types/articles";
import Articles from "@/components/Articles.vue";
import { ref, onMounted } from "vue";
import AppPagination from "./AppPagination.vue";
import { useUserStore } from "@/store";
import { FEED, GLOBAL, TAG } from "@/common/global";
const userStore = useUserStore();
let params = ref<ArticlesParams>({ limit: 10 });

let articles = ref<Array<Article>>([]);
let loading_articles = ref<boolean>(true);

let loading_tags = ref<boolean>(true);
let tags = ref<Array<any>>([]);

let pages = ref<number>(0);
const range = 10;
let curPage = ref<number>(1);
let isShowPage = ref<boolean>(false);
let curArticleTypes = ref<number>(FEED);

function changePage(page: number) {
  curPage.value = page;
  params.value.offset = (curPage.value - 1) * range;
  loading_articles.value = true;
  switch (curArticleTypes.value) {
    case FEED:
      getFeedArticles(params.value).then((res) => {
        loading_articles.value = false;
        articles.value = res.articles;
        pages.value = Math.ceil(res.articlesCount / range);
      });
      break;
    case GLOBAL:
      getArticles(params.value).then((res) => {
        loading_articles.value = false;
        articles.value = res.articles;
        pages.value = Math.ceil(res.articlesCount / range);
      });
      break;
  }
  // getArticles(params.value).then((res) => {
  //   loading_articles.value = false;
  //   articles.value = res.articles;
  //   pages.value = Math.ceil(res.articlesCount / range);
  // });
}

function handleGetGlobalArticles() {
  curPage.value = 1;
  curArticleTypes.value = GLOBAL;
  params.value.offset = curPage.value - 1;
  loading_articles.value = true;
  getArticles(params.value).then((res) => {
    loading_articles.value = false;
    articles.value = res.articles;
    pages.value = Math.ceil(res.articlesCount / range);
  });
}

onMounted(() => {
  loading_articles.value = true;
  loading_tags.value = true;
  curArticleTypes.value = FEED;
  getArticles(params.value).then((res) => {
    loading_articles.value = false;
    isShowPage.value = true;
    articles.value = res.articles;
    pages.value = Math.ceil(res.articlesCount / range);
  });
  getTags().then((res) => {
    tags.value = res.tags;
    loading_tags.value = false;
  });
});
</script>

<style></style>

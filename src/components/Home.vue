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
              <li class="nav-item">
                <a href="" class="nav-link">Your Feed</a>
              </li>
              <li class="nav-item">
                <a href="" class="active nav-link">Global Feed</a>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-if="loading_articles">
            Loading articles...
          </div>
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
import { getArticles, getTags } from "@/api/article";
import { Article, ArticlesParams } from "@/types/articles";
import Articles from "@/components/Articles.vue";
import { ref } from "vue";
import { onMounted } from "vue";
import AppPagination from "./AppPagination.vue";
let params = ref<ArticlesParams>({ limit: 10 });

let articles = ref<Array<Article>>([]);
let loading_articles = ref<boolean>(true);

let loading_tags = ref<boolean>(true);
let tags = ref<Array<any>>([]);

let pages = ref<number>(0);
let curPage = ref<number>(1);
let isShowPage = ref<boolean>(false);

function changePage(page: number) {
  curPage.value = page;
}

onMounted(() => {
  loading_articles.value = true;
  loading_tags.value = true;
  getArticles(params.value).then((res) => {
    loading_articles.value = false;
    isShowPage.value = true;
    articles.value = res.articles;
    pages.value = res.articlesCount;
  });
  getTags().then((res) => {
    tags.value = res.tags;
    loading_tags.value = false;
  });
});
</script>

<style></style>

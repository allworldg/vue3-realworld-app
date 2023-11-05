<template>
  <div class="article-preview" v-if="is_loading_articles">
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
</template>

<script setup lang="ts">
import Articles from "./Articles.vue";
import { ArticlesParams } from "@/types/articles";
import AppPagination from "./AppPagination.vue";
import { ref } from "vue";
import { Article } from "@/types/articles";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { getArticles } from "@/api/article";

let is_loading_articles = ref<boolean>(true);
let articles = ref<Array<Article>>([]);
let pages = ref<number>(0);
let curPage = ref<number>(1);
let isShowPage = ref<boolean>(false);
const range = 5;
const route = useRoute();
let params = ref<ArticlesParams>({ limit: range, offset: 0 });

function changePage(page: number) {
  curPage.value = page;
  params.value.offset = (curPage.value - 1) * range;
  is_loading_articles.value = true;
  getArticles(params.value).then((res) => {
    articles.value = res.articles;
    pages.value = Math.ceil(res.articlesCount / range);
    is_loading_articles.value = false;
  });
}

onMounted(() => {
  is_loading_articles.value = true;
  isShowPage.value = false;
  let username = route.params.username as string;
  let favorites = route.name;
  if (favorites === "favorites") {
    params.value.favorited = username;
  } else {
    params.value.author = username;
  }
  getArticles(params.value).then((res) => {
    articles.value = res.articles;
    pages.value = Math.ceil(res.articlesCount / range);
    is_loading_articles.value = false;
    isShowPage.value = true;
  });
});
</script>

<style></style>

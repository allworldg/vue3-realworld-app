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
            <div class="article-preview">
              <div class="article-meta">
                <a href="/profile/eric-simons"
                  ><img src="http://i.imgur.com/Qr71crq.jpg"
                /></a>
                <div class="info">
                  <a href="/profile/eric-simons" class="author">Eric Simons</a>
                  <span class="date">January 20th</span>
                </div>
                <button class="btn btn-outline-primary btn-sm pull-xs-right">
                  <i class="ion-heart"></i> 29
                </button>
              </div>
              <a
                href="/article/how-to-build-webapps-that-scale"
                class="preview-link"
              >
                <h1>How to build webapps that scale</h1>
                <p>This is the description for the post.</p>
                <span>Read more...</span>
                <ul class="tag-list">
                  <li class="tag-default tag-pill tag-outline">realworld</li>
                  <li class="tag-default tag-pill tag-outline">
                    implementations
                  </li>
                </ul>
              </a>
            </div>

            <ul class="pagination">
              <li class="page-item active">
                <a class="page-link" href="">1</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="">2</a>
              </li>
            </ul>
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
import { ref } from "vue";
import { onMounted } from "vue";
let params = ref<ArticlesParams>({ limit: 10 });
let articles = ref<Array<Article>>([]);
let tags = ref<Array<any>>([]);
let loading_articles = ref<boolean>(true);
let loading_tags = ref<boolean>(true);

onMounted(() => {
  loading_articles.value = true;
  loading_tags.value = true;
  getArticles(params.value).then((res) => {
    articles.value = res;
    loading_articles.value = false;
  });
  getTags().then((res) => {
    tags.value = res.tags;
    loading_tags.value = false;
  });
});
</script>

<style></style>

<template>
  <div v-if="articles?.length === 0">
    {{ NO_ARTICLES_TEXT }}
  </div>
  <div
    class="article-preview"
    v-for="(article, index) in articles"
    :key="index"
  >
    <div class="article-meta">
      <RouterLink :to="`@${article.author.username}`">
        <img :src="article.author.image" />
      </RouterLink>
      <div class="info">
        <RouterLink :to="`@${article.author.username}`" class="author">
          {{ article.author.username }}
        </RouterLink>
        <span class="date">{{ article.createdAt }}</span>
      </div>
      <button class="btn btn-outline-primary btn-sm pull-xs-right">
        <i class="ion-heart"></i> {{ article.favoritesCount }}
      </button>
    </div>
    <a :href="`article/${article.slug}`" class="preview-link">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li
          class="tag-default tag-pill tag-outline"
          v-for="(item, index) in article.tagList"
          :key="index"
        >
          {{ item }}
        </li>
      </ul>
    </a>
  </div>
</template>

<script setup lang="ts">
import { NO_ARTICLES_TEXT } from "@/common/global";
import { Article } from "@/types/articles";
//@ts-ignore
const props = defineProps({
  articles: Array<Article>,
});
</script>

<style></style>

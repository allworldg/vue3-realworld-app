<template>
  <div v-if="articles?.length === 0">
    {{ NO_ARTICLES_TEXT }}
  </div>
  <div class="article-preview" v-for="(article, index) in articles" :key="index">
    <div class="article-meta">
      <RouterLink :to="`/@${article.author.username}`">
        <img :src="article.author.image" />
      </RouterLink>
      <div class="info">
        <RouterLink :to="`/@${article.author.username}`" class="author">
          {{ article.author.username }}
        </RouterLink>
        <span class="date">{{ article.createdAt }}</span>
      </div>
      <button
        :disabled="disableIndex.includes(index)"
        class="btn btn-sm pull-xs-right"
        :class="{ 'btn-primary': article.favorited, 'btn-outline-primary': !article.favorited }"
        @click="favoriteArticle(index)">
        <i class="ion-heart"></i>
        {{ article.favoritesCount }}
      </button>
    </div>
    <a :href="`/article/${article.slug}`" class="preview-link">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li
          class="tag-default tag-pill tag-outline"
          v-for="(item, index) in article.tagList"
          :key="index">
          {{ item }}
        </li>
      </ul>
    </a>
  </div>
</template>

<script setup lang="ts">
import { addFavoriteArticle, unFavoriteArticle } from "@/api/article";
import { NO_ARTICLES_TEXT } from "@/common/global";
import { useUserStore } from "@/store";
import { Article } from "@/types/articles";
import { ref } from "vue";
import { useRouter } from "vue-router";
//@ts-ignore
const props = defineProps<{ articles: Array<Article> }>();
const articles = props.articles;
const userStore = useUserStore();
const router = useRouter();
let disableIndex = ref<Array<number>>([]);
function favoriteArticle(index: number) {
  if (index < 0 || index > props.articles!.length - 1) {
    return;
  }
  if (userStore.getIsLogined === false) {
    router.push({ path: "/register" });
  } else {
    disableIndex.value.push(index);
    if (articles[index].favorited === false) {
      addFavoriteArticle(articles[index].slug).then((res) => {
        let article = res.article;
        articles[index] = { ...article };
        disableIndex.value = disableIndex.value.filter((item) => item !== index);
      });
    } else {
      unFavoriteArticle(articles[index].slug).then((res) => {
        let article = res.article;
        articles[index] = { ...article };
        disableIndex.value = disableIndex.value.filter((item) => item !== index);
      });
    }
  }
}
</script>

<style></style>

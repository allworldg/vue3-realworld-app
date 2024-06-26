<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <div class="article-meta">
          <RouterLink :to="`/@${author.username}`">
            <img :src="author.image" />
          </RouterLink>
          <div class="info">
            <RouterLink :to="`/@${author.username}`" class="author">
              {{ author.username }}
            </RouterLink>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <span v-if="!isCurrentUser">
            <button
              class="btn btn-sm"
              :class="{
                'btn-secondary': author.following,
                'btn-outline-secondary': !author.following,
              }"
              @click="handleFollow">
              <i class="ion-plus-round"></i>
              &nbsp; {{ `${isFollowingText} ${author.username}` }}
            </button>
            &nbsp;&nbsp;
            <button
              class="btn btn-sm"
              :class="{
                'btn-primary': article.favorited,
                'btn-outline-primary': !article.favorited,
              }"
              :disabled="favorite_disable"
              @click="handleFavorite">
              <i class="ion-heart"></i>
              &nbsp; {{ isFavoritedArticle }} article
              <span class="counter">({{ article.favoritesCount }})</span>
            </button>
          </span>
          <span v-else>
            <button class="btn btn-sm btn-outline-secondary" @click="handleEditArticle">
              <i class="ion-edit"></i>
              Edit Article
            </button>
            <button class="btn btn-sm btn-outline-danger" @click="handleDeleteArticle">
              <i class="ion-trash-a"></i>
              Delete Article
            </button>
          </span>
        </div>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <div v-html="article.body"></div>
          <ul class="tag-list">
            <li
              v-for="(tag, index) in article.tagList"
              :key="index"
              class="tag-default tag-pill tag-outline">
              {{ tag }}
            </li>
          </ul>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <div class="article-meta">
          <RouterLink :to="`/@${author.username}`"><img :src="author.image" /></RouterLink>
          <div class="info">
            <a href="" class="author">{{ author.username }}</a>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <span v-if="!isCurrentUser">
            <button
              class="btn btn-sm"
              :class="{
                'btn-secondary': author.following,
                'btn-outline-secondary': !author.following,
              }"
              @click="handleFollow">
              <i class="ion-plus-round"></i>
              &nbsp; {{ `${isFollowingText} ${author.username}` }}
            </button>
            &nbsp;
            <button
              class="btn btn-sm"
              :class="{
                'btn-primary': article.favorited,
                'btn-outline-primary': !article.favorited,
              }"
              @click="handleFavorite">
              <i class="ion-heart"></i>
              &nbsp; {{ isFavoritedArticle }} Article
              <span class="counter">({{ article.favoritesCount }})</span>
            </button>
          </span>
          <span v-else>
            <button class="btn btn-sm btn-outline-secondary" @click="handleEditArticle">
              <i class="ion-edit"></i>
              Edit Article
            </button>
            <button class="btn btn-sm btn-outline-danger" @click="handleDeleteArticle">
              <i class="ion-trash-a"></i>
              Delete Article
            </button>
          </span>
        </div>
      </div>

      <div class="row">
        <Comment :comments="comments" :slug="slug" @delete-comment="handleDeleteComment"></Comment>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  addFavoriteArticle,
  deleteArticle,
  getArticle,
  getComments,
  unFavoriteArticle,
} from "@/api/article";
import { follow, unfollow } from "@/api/user";
import { useUserStore } from "@/store";
import { Article, Comment as CommentType } from "@/types/articles";
import { Profile } from "@/types/user";
import { computed } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { FAVORITE_TEXT, FOLLOW_TEXT, UNFAVORITE_TEXT, UNFOLLOW_TEXT } from "@/common/global";
import Comment from "@/components/Comment.vue";
import { parseMarkdown } from "@/utils";
const props = defineProps<{ slug: string }>();
const slug = props.slug;
let article = ref<Article>({} as Article);
let author = ref<Profile>({} as Profile);
let comments = ref<Array<CommentType>>([]);
let favorite_disable = ref<boolean>(false);
const userStore = useUserStore();
const router = useRouter();
let isCurrentUser = computed(() => {
  return userStore.getIsLogined && userStore.getUser?.username === author.value.username;
});
let isFollowingText = computed(() => {
  return author.value.following === true ? UNFOLLOW_TEXT : FOLLOW_TEXT;
});

let isFavoritedArticle = computed(() => {
  return article.value.favorited === true ? UNFAVORITE_TEXT : FAVORITE_TEXT;
});
getArticle(slug).then((res) => {
  article.value = res.article;
  author.value = article.value.author;
  article.value.body = parseMarkdown(article.value.body);
});
getComments(slug).then((res) => {
  comments.value = res.comments;
});

function handleFollow() {
  if (userStore.isLogined === false) {
    router.push({ path: "/login" });
  }
  if (author.value.following !== true) {
    follow(author.value.username).then((res) => {
      author.value = { ...res.profile };
    });
  } else {
    unfollow(author.value.username).then((res) => {
      author.value = { ...res.profile };
    });
  }
}

function handleFavorite() {
  if (userStore.isLogined === false) {
    router.push({ path: "/login" });
  }
  favorite_disable.value = true;
  if (article.value.favorited !== true) {
    addFavoriteArticle(article.value.slug).then((res) => {
      article.value = { ...res.article };
      favorite_disable.value = false;
    });
  } else {
    unFavoriteArticle(article.value.slug).then((res) => {
      article.value = { ...res.article };
      favorite_disable.value = false;
    });
  }
}

function handleEditArticle() {
  router.push({ name: "editor", params: { slug: article.value.slug } });
}

function handleDeleteArticle() {
  deleteArticle(article.value.slug).then(() => {
    router.push({ path: "/" });
  });
}

function handleDeleteComment(id: number) {
  comments.value = comments.value.filter((e) => {
    return id !== e.id;
  });
}
</script>

<style></style>

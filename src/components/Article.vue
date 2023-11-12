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
              @click="handleFavorite">
              <i class="ion-heart"></i>
              &nbsp; {{ isFavoritedArticle }} article
              <span class="counter">({{ article.favoritesCount }})</span>
            </button>
          </span>
          <span v-else>
            <button class="btn btn-sm btn-outline-secondary">
              <i class="ion-edit"></i>
              Edit Article
            </button>
            <button class="btn btn-sm btn-outline-danger">
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
          <a href="profile.html"><img :src="author.image" /></a>
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
            <button class="btn btn-sm btn-outline-secondary">
              <i class="ion-edit"></i>
              Edit Article
            </button>
            <button class="btn btn-sm btn-outline-danger">
              <i class="ion-trash-a"></i>
              Delete Article
            </button>
          </span>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
              <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
            </div>
            <div class="card-footer">
              <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
              <button class="btn btn-sm btn-primary">Post Comment</button>
            </div>
          </form>

          <div class="card">
            <div class="card-block">
              <p class="card-text">
                With supporting text below as a natural lead-in to additional content.
              </p>
            </div>
            <div class="card-footer">
              <a href="/profile/author" class="comment-author">
                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
              </a>
              &nbsp;
              <a href="/profile/jacob-schmidt" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
            </div>
          </div>

          <div class="card">
            <div class="card-block">
              <p class="card-text">
                With supporting text below as a natural lead-in to additional content.
              </p>
            </div>
            <div class="card-footer">
              <a href="/profile/author" class="comment-author">
                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
              </a>
              &nbsp;
              <a href="/profile/jacob-schmidt" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
              <span class="mod-options">
                <i class="ion-trash-a"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { addFavoriteArticle, getArticle, unFavoriteArticle } from "@/api/article";
import { follow, unfollow } from "@/api/user";
import { useUserStore } from "@/store";
import { Article } from "@/types/articles";
import { Profile } from "@/types/user";
import { computed } from "vue";
import { ref } from "vue";
import { marked } from "marked";
import { useRouter } from "vue-router";
import { FAVORITE_TEXT, FOLLOW_TEXT, UNFAVORITE_TEXT, UNFOLLOW_TEXT } from "@/common/global";
const props = defineProps<{ slug: string }>();
const slug = props.slug;
let article = ref<Article>({} as Article);
let author = ref<Profile>({} as Profile);
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

function parseMarkdown(text: string) {
  return marked.parse(text);
}

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
  if (article.value.favorited !== true) {
    addFavoriteArticle(article.value.slug).then((res) => {
      article.value = { ...res.article };
    });
  } else {
    unFavoriteArticle(article.value.slug).then((res) => {
      article.value = { ...res.article };
    });
  }
}


</script>

<style></style>

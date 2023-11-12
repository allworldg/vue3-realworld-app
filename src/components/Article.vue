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
          <div v-if="!isCurrentUser">
            <button class="btn btn-sm btn-outline-secondary" :class="{ 'btn-secondary': author }">
              <i class="ion-plus-round"></i>
              &nbsp; Follow {{ author.username }}
            </button>
            &nbsp;&nbsp;
            <button
              class="btn btn-sm"
              :class="{
                'btn-primary': article.favorited,
                'btn-outline-primary': !article.favorited,
              }"
            >
              <i class="ion-heart"></i>
              &nbsp; Favorite article
              <span class="counter">({{ article.favoritesCount }})</span>
            </button>
          </div>
          <div v-else>
            <button class="btn btn-sm btn-outline-secondary">
              <i class="ion-edit"></i>
              Edit Article
            </button>
            <button class="btn btn-sm btn-outline-danger">
              <i class="ion-trash-a"></i>
              Delete Article
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <div v-html="article.body"></div>
          <ul class="tag-list">
            <li class="tag-default tag-pill tag-outline">realworld</li>
            <li class="tag-default tag-pill tag-outline">implementations</li>
          </ul>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <div class="article-meta">
          <a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
          <div class="info">
            <a href="" class="author">Eric Simons</a>
            <span class="date">January 20th</span>
          </div>

          <button class="btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round"></i>
            &nbsp; Follow Eric Simons
          </button>
          &nbsp;
          <button class="btn btn-sm btn-outline-primary">
            <i class="ion-heart"></i>
            &nbsp; Favorite Article
            <span class="counter">(29)</span>
          </button>
          <button class="btn btn-sm btn-outline-secondary">
            <i class="ion-edit"></i>
            Edit Article
          </button>
          <button class="btn btn-sm btn-outline-danger">
            <i class="ion-trash-a"></i>
            Delete Article
          </button>
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
import { getArticle } from "@/api/article";
import { useUserStore } from "@/store";
import { Article } from "@/types/articles";
import { Profile } from "@/types/user";
import { computed } from "vue";
import { ref } from "vue";
import { marked } from "marked";
const props = defineProps<{ slug: string }>();
const slug = props.slug;
let article = ref<Article>({} as Article);
let author = ref<Profile>({} as Profile);
const userStore = useUserStore();
let isCurrentUser = computed(() => {
  return userStore.getIsLogined && userStore.getUser?.username === author.value.username;
});
getArticle(slug).then((res) => {
  article.value = res.article;
  author.value = article.value.author;
  article.value.body = parseMarkdown(article.value.body);
});

function parseMarkdown(text: string) {
  return marked.parse(text);
}
</script>

<style></style>

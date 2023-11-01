<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile?.image" class="user-img" alt="this is image" />
            <h4>{{ profile!.username }}</h4>
            <p>
              {{ profile!.bio }}
            </p>
            <button class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp; Follow {{ profile!.username }}
            </button>
            <button class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-gear-a"></i>
              &nbsp; Edit Profile Settings
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link active" href="">My Articles</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="">Favorited Articles</a>
              </li>
            </ul>
          </div>
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
              href="/article/how-to-buil-webapps-that-scale"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { getProfile } from "@/api/user";
import { useUserStore } from "@/store";
import { Profile } from "@/types/user";
import { ref } from "vue";
import { onMounted } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
const userStore = useUserStore();
const route = useRoute();
const profile = ref<Profile>({
  username: "",
  bio: "",
  image: "",
  following: false,
});
onMounted(() => {
  profile.value = route.meta.profile as Profile;
});

</script>

<style></style>

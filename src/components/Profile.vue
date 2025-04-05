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
            <button
              v-if="isCurrentUser"
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="handleUpdateProfile">
              <i class="ion-gear-a"></i>
              &nbsp; Edit Profile Settings
            </button>
            <button
              @click="handleFollow"
              v-else
              class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp; {{ isFollowed }} {{ profile!.username }}
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
                <RouterLink
                  exact-active-class="active"
                  class="nav-link"
                  :to="{ name: 'profileArticle' }">
                  My Articles
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" active-class="active" :to="{ name: 'favorites' }">
                  Favorited Articles
                </RouterLink>
              </li>
            </ul>
          </div>
          <RouterView :key="(route.path as string)"></RouterView>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { follow, getProfile, unfollow } from "@/api/user";
import { useUserStore } from "@/store";
import { Profile } from "@/types/user";
import { watch } from "vue";
import { onMounted, computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const profile = ref<Profile>({
  username: "",
  bio: "",
  image: "",
  following: false,
});
let isCurrentUser = ref<boolean>(false);
let isFollowed = computed(() => {
  return profile.value.following === false ? "Follow" : "Unfollow";
});
function handleUpdateProfile() {
  router.push({ path: "/settings" });
}
function handleFollow() {
  if (userStore.getIsLogined === false) {
    router.push({ path: "/login" });
  } else if (profile.value.following === false) {
    follow(profile.value.username).then((res) => {
      profile.value = res.profile;
    });
  } else {
    unfollow(profile.value.username).then((res) => {
      profile.value = res.profile;
    });
  }
}

onMounted(() => {
  profile.value = route.meta.profile as Profile;
  if (!userStore.getIsLogined || userStore.getUser?.username !== profile.value.username) {
    isCurrentUser.value = false;
  } else {
    isCurrentUser.value = true;
  }
});

watch(
  () => route.params.username,
  (newUserName) => {
    getProfile(newUserName as string)
      .then((res) => {
        profile.value = res.profile;
        if (!userStore.getIsLogined || userStore.getUser?.username !== profile.value.username) {
          isCurrentUser.value = false;
        } else {
          isCurrentUser.value = true;
        }
      })
      .catch((_e) => {
        router.push({ path: "/" });
      });
  }
);
</script>

<style></style>

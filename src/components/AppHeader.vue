<template>
  <nav class="navbar navbar-light">
    <div>
      <div class="container">
        <RouterLink class="navbar-brand" to="/">Conduit</RouterLink>
        <ul v-if="userStore.getIsLogined" class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <RouterLink class="nav-link" exact active-class="active" to="/">Home</RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link" active-class="active" to="/editor">
              <i class="ion-compose"></i>
              &nbsp;New Article
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" active-class="active" to="/settings">
              <i class="ion-gear-a"></i>
              &nbsp;Settings
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              active-class="active"
              :to="`/@${userStore.getUser!.username}`">
              <img :src="userStore.getUser?.image" class="user-pic" />
              {{ userStore.getUser?.username }}
            </RouterLink>
          </li>
        </ul>
        <ul v-else class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <RouterLink class="nav-link" exact active-class="active" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" active-class="active" to="/login">Sign in</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" active-class="active" to="/register">Sign up</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <noscript>
    <div>we are sorry but vue3-realworld-app doesn't work properly without JavaScript enabled.</div>
  </noscript>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store";
const userStore = useUserStore();
</script>

<style></style>

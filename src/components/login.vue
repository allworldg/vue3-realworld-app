<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <RouterLink to="/register">Need an account?</RouterLink>
          </p>
          <ul class="error-messages">
            <li v-for="(value, key) in errors">
              {{ key }}
              <span v-for="(error, index) in value" :key="index">
                {{ error }}
              </span>
            </li>
          </ul>
          <form @submit.prevent="handleLogin">
            <fieldset class="form-group">
              <input
                id="Email"
                class="form-control form-control-lg"
                v-model="email"
                required
                type="email"
                placeholder="Email" />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                v-model="password"
                required
                type="password"
                placeholder="Password" />
            </fieldset>
            <button type="submit" class="btn btn-lg btn-primary pull-xs-right">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { login } from "@/api/user";
import { ref } from "vue";
import { useUserStore } from "@/store/index";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
let email = ref<string>("");
let password = ref<string>("");
let errors = ref<Array<any>>([]);
const userStore = useUserStore();
function handleLogin() {
  login({
    email: email.value,
    password: password.value,
  })
    .then((res) => {
      userStore.setAuth(res.user);
      router.push({
        path: (route.query?.redirect as string) || "/",
        replace: true,
      });
    })
    .catch((e) => {
      errors.value = e.response.data.errors;
    });
}
</script>

<style></style>

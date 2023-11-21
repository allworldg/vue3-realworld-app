<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <RouterLink :to="{ name: 'login' }">Have an account?</RouterLink>
          </p>

          <!-- <ul class="error-messages">
            <li>That email is already taken</li>
          </ul> -->

          <form @submit.prevent="handleRegister">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Username"
                v-model="username"
                required />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                v-model="email"
                required />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="password"
                required />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" type="submit">Sign up</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { register } from "@/api/user";
import { useUserStore } from "@/store";
import { ref } from "vue";
import { useRouter } from "vue-router";

let username = ref<string>("");
let email = ref<string>("");
let password = ref<string>("");
const router = useRouter();
const userStore = useUserStore();
function handleRegister() {
  register({ username: username.value, email: email.value, password: password.value }).then(
    (res) => {
      userStore.setAuth(res.user);
      router.push({ path: "/" });
    }
  );
}
</script>

<style></style>

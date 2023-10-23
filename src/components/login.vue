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
            <li>email or password is invalid</li>
          </ul>
          <form>
            <fieldset class="form-group">
              <input
                id="Email"
                class="form-control form-control-lg"
                required
                v-model="email"
                type="email"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                v-model="password"
                required
                type="password"
                placeholder="Password"
              />
            </fieldset>
            <button
              type="submit"
              class="btn btn-lg btn-primary pull-xs-right"
              @click="handleLogin"
            >
              Sign in
            </button>
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
let email = ref<string>("");
let password = ref<string>("");
const userStore = useUserStore();
function handleLogin() {
  login({
    email: email.value,
    password: password.value,
  }).then((res) => {
    userStore.setAuth(res);
  });
}
</script>

<style></style>

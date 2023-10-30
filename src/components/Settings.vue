<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <ul class="error-messages">
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
          </ul>
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  :disabled="isUpdating"
                  type="text"
                  class="form-control"
                  placeholder="URL of profile picture"
                  v-model="user.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  :disabled="isUpdating"
                  type="text"
                  class="form-control form-control-lg"
                  required
                  placeholder="Username"
                  v-model="user.username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  :disabled="isUpdating"
                  rows="8"
                  class="form-control form-control-lg"
                  placeholder="short bio about you"
                  v-model="user.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  :disabled="isUpdating"
                  class="form-control form-control-lg"
                  required
                  type="email"
                  placeholder="Email"
                  v-model="user.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  :disabled="isUpdating"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="New Password"
                  v-model="newPassword"
                />
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                @click="handleUpdate"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="handleLogout">
            Or Click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store";
import { ref, reactive } from "vue";
import { updateUser } from "@/api/user";
import { removeCookie } from "@/utils/auth";
import { useRouter } from "vue-router";
const userStore = useUserStore();
const router = useRouter();
const user = reactive({ ...userStore.getUser! });
let newPassword = ref<string>("");
let isUpdating = ref<boolean>(false);
let errors = ref<Array<String>>([]);
function handleUpdate() {
  isUpdating.value = true;
  updateUser({
    user: {
      email: user.email,
      username: user.username,
      bio: user.bio,
      password: newPassword.value,
      image: user.image,
    },
  })
    .then((res) => {
      userStore.setAuth(res.user);
      isUpdating.value = false;
    })
    .catch((e) => {
      errors.value.push(e.response.data);
    });
}
function handleLogout() {
  userStore.$reset();
  removeCookie();
  router.push({ path: "/", replace: true });
}
</script>

<style></style>

<template>
  <div class="col-xs-12 col-md-8 offset-md-2">
    <div v-if="!userStore.isLogined">
      <RouterLink :to="{ name: 'login' }">Sign in</RouterLink>
      <span>&nbsp;or&nbsp;</span>
      <RouterLink :to="{ name: 'register' }">sign up</RouterLink>
      <span>&nbsp;to add comments on this article.</span>
      <hr />
    </div>
    <div v-else>
      <form class="card comment-form">
        <div class="card-block">
          <textarea
            class="form-control"
            placeholder="Write a comment..."
            rows="3"
            required
            v-model="inputText"></textarea>
        </div>
        <div class="card-footer">
          <img :src="userStore.getUser?.image" class="comment-author-img" />
          <button class="btn btn-sm btn-primary" @click.prevent="handlePostComment">
            Post Comment
          </button>
        </div>
      </form>
    </div>

    <div class="card" v-for="(comment, index) in props.comments" :key="index">
      <div class="card-block">
        <p v-html="parseMarkdown(comment.body)" class="card-text"></p>
      </div>
      <div class="card-footer">
        <RouterLink :to="`/@${comment.author.username}`" class="comment-author-img">
          <img :src="comment.author.image" class="comment-author-img" />
        </RouterLink>
        &nbsp;
        <RouterLink :to="`/@${comment.author.username}`" class="comment-author">
          {{ comment.author.username }}
        </RouterLink>
        <span class="date-posted">{{ comment.createdAt }}</span>
        <span class="mod-options" v-if="userStore.getUser?.username === comment.author.username">
          <i class="ion-trash-a" @click="handleDeleteComment(comment.id)"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store";
import { Comment } from "@/types/articles";
import { ref } from "vue";
import { parseMarkdown } from "@/utils";
import { deleteComment, postComment } from "@/api/article";
const props = defineProps<{ comments: Array<Comment>; slug: string }>();
const emit = defineEmits(["deleteComment"]);
const userStore = useUserStore();
let inputText = ref<string>("");
function handlePostComment() {
  if (inputText.value.trim() === "") {
    return;
  }
  postComment({ body: inputText.value }, props.slug).then((res) => {
    props.comments.unshift(res.comment);
    inputText.value = "";
  });
}

function handleDeleteComment(id: number) {
  deleteComment(id, props.slug).then(() => {
    emit("deleteComment", id);
  });
}
</script>

<style></style>

<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ul class="error-messages">
            <li v-for="(value, key) in errors" :key="key">
              <span>{{ key }}&nbsp;</span>
              <span v-for="(error, index) in value" :key="index">{{ error }}</span>
            </li>
          </ul>
          <form @submit.prevent="handleUpdateOrAddArticle" @keydown.enter.prevent="() => {}">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                  required />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                  required />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                  required></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="tag"
                  @keyup.self.enter.prevent="handleAddTag" />
                <div class="tag-list">
                  <span
                    class="tag-default tag-pill"
                    v-for="(tag, index) in article.tagList"
                    :key="index">
                    <i class="ion-close-round" @click="handleDeleteTag(tag)"></i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary" type="submit">
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { addArticle, getArticle, updateArticle } from "@/api/article";
import { Article } from "@/types/articles";
import { ref } from "vue";
import { useRouter } from "vue-router";
const props = defineProps<{ slug: string }>();
let article = ref<Article>({ tagList: [] as Array<string> } as Article);
let tag = ref<string>("");
let router = useRouter();
let errors = ref<Array<String>>([]);
if (props.slug !== "") {
  getArticle(props.slug).then((res) => {
    article.value = res.article;
  });
}
function handleAddTag() {
  if (tag.value !== "") {
    article.value.tagList.unshift(tag.value);
    tag.value = "";
  }
}

function handleUpdateOrAddArticle() {
  if (article.value.title === "") {
    return;
  }
  let { title, description, body, tagList } = article.value;
  if (props.slug !== "") {
    updateArticle({ title, description, body, tagList }, props.slug).then((res) => {
      router.push({ name: "article", params: { slug: res.article.slug } });
    });
  } else {
    addArticle({
      title,
      description,
      body,
      tagList,
    })
      .then((res) => {
        router.push({ name: "article", params: { slug: res.article.slug } });
      })
      .catch((e) => {
        errors.value = e.response.data.errors;
      });
  }
}
function handleDeleteTag(tag: string) {
  article.value.tagList = article.value.tagList.filter((e) => {
    return tag !== e;
  });
}
</script>

<style></style>

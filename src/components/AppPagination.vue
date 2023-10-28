<template>
  <ul class="pagination">
    <li
      v-for="(page, index) in pageCounts"
      :class="pageClass(page)"
      :key="index"
      @click.prevent="changeCurPage(page)"
    >
      <a class="page-link" href="">{{ page }}</a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from "vue";
const emit = defineEmits(["changePage"]);
const range = 10;
//@ts-ignore
let props = defineProps<{
  pages: number;
  curPage: number;
}>();
function pageClass(page: number) {
  return {
    "page-item": true,
    active: props.curPage == page,
  };
}
let pageCounts = computed(() => {
  let result = Math.floor(props.pages / range);
  if (props.pages % range != 0) {
    result++;
  }
  return result;
});
function changeCurPage(page: number) {
  if (page == props.curPage) {
    return;
  }
  emit("changePage", page);
}
</script>

<style></style>

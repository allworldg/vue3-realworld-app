<template>
  <ul class="pagination">
    <li
      v-for="(page, index) in pages"
      :class="pageClass(page)"
      :key="index"
      @click.prevent="changeCurPage(page)"
    >
      <a class="page-link" href="">{{ page }}</a>
    </li>
  </ul>
</template>

<script setup lang="ts">
const emit = defineEmits(["changePage"]);
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
function changeCurPage(page: number) {
  if (page == props.curPage) {
    return;
  }
  emit("changePage", page);
}
</script>

<style></style>

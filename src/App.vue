<template>
  <div>
    <AppHeader />
    <RouterView></RouterView>
    <AppFooter />
  </div>
</template>
  
<script setup lang='ts'>
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue';
</script>
  
<style></style>
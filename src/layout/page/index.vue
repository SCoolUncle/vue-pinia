<template>
    <keep-alive v-if="isCache">
        <RouterView></RouterView>
    </keep-alive>
    <RouterView v-else></RouterView>
</template>

<script setup lang="ts">
  import { RouterView, useRoute } from 'vue-router';
  import { computed  } from 'vue';

  const router = useRoute()
  const isCache = computed(() => {
      console.log(router.meta.isCache)
    return !!router.meta.isCache;
  });
    
</script>

<style lang="less" scoped>
    
</style>
<template>
    <keep-alive v-if="isCache">
        <transition name="fade">
            <RouterView></RouterView>
        </transition>
    </keep-alive>
    <RouterView v-else></RouterView>
    <div>layout</div>
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
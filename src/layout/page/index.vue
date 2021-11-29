<template>
        <RouterView v-slot="{Component,route}">
            <transition name="fade" mode="out-in">
                <keep-alive v-if="isCache">
                    <component :is="Component" :key="route.fullPath"/>
                </keep-alive>
                <component v-else :is="Component" :key="route.fullPath"/>
            </transition>
        </RouterView>
    <div>layout</div>
</template>

<script setup lang="ts">
  import { RouterView, useRoute } from 'vue-router';
  import { computed  } from 'vue';

  const router = useRoute()
  console.log(router)
  const isCache = computed(() => {
      console.log(router?.meta?.isCache)
    return !!router?.meta?.isCache;
  });  
    
</script>

<style lang="less" scoped>
    
</style>
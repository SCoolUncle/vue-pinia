<template>
    <RouterView v-slot="{Component,route}">
        <transition name="fade" mode="out-in">
            <keep-alive v-if="$route.meta.keepAlive">
                <component :is="Component" :key="route.fullPath"/>
            </keep-alive>
            <component v-else :is="Component" :key="route.fullPath"/>
        </transition>
    </RouterView>
</template>

<script setup lang="ts">
  import { RouterView, useRoute } from 'vue-router';
  import { computed  } from 'vue';

  const route = useRoute()
    
</script>

<style lang="less" scoped>
    
</style>
<script setup lang="ts">
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
  import { RouterView } from 'vue-router';
  import { onMounted, onBeforeUnmount, onUnmounted } from 'vue';
  import { ConfigProvider } from 'ant-design-vue';

  import {setupProvideState,setupProvideActions} from '/@/store/provide/index'

  setupProvideState()
  setupProvideActions()

  onMounted(() => {

  }),
  onBeforeUnmount(() => {

  }),
  onUnmounted(() => {

  })
</script>

<template>
  <ConfigProvider>
    <RouterView> </RouterView>
  </ConfigProvider>
</template>

<style>
  #app {
    /* font-family: Avenir, Helvetica, Arial, sans-serif; */
    /* font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; */
    font-family: 'Noto Sans SC';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>

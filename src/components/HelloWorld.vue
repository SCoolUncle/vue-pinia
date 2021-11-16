<template>
  <div>
    <a href="#">hello</a>
    <Button type="primary">hello</Button>
    <span class="iconify" data-icon="mdi:account-circle"></span>
  </div>
 
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import {Button} from "ant-design-vue"
  const count = ref(0);
</script>

<style scoped>
</style>

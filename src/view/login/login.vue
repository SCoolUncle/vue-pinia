<template>
    <div>登录页面</div>
    <Button type="primary"  @click="handleLogin">登录</Button>
</template>

<script setup lang="ts">
    import { login } from '/@/api/base'
    import {Button} from 'ant-design-vue'

    async function handleLogin(){
        await login()
    }
</script>

<style lang="less" scoped>
    
</style>
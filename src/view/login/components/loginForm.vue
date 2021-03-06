<template>
  <div class="p-16 rounded-md hover:shadow-xl login_box" hoverable :bordered="false">
    <div class="flex justify-center login_logo">
      <img :src="logo" alt="这个世界只有我和你" width="50" />
    </div>
    <div class="flex items-center justify-between mt-8 text-purple-200 top_tab">
      <span
        href="javascript:void()"
        :class="{
          login_tab: state.isLogin,
          'text-base': true,
          'cursor-pointer': true,
          'font-bold': state.isLogin,
          'text-purple-200': true,
          'text-purple-500': state.isLogin,
        }"
        @click="loginHandle"
        >登录</span
      >
      <span class="border-r h-7"></span>
      <span
        href="javascript:void()"
        :class="{
          login_tab: !state.isLogin,
          'text-base': true,
          'cursor-pointer': true,
          'font-bold': !state.isLogin,
          'text-purple-200': true,
          'text-purple-500': !state.isLogin,
        }"
        @click="registerHandle"
        >注册</span
      >
    </div>
    <div class="mt-16 login_form">
      <Form
        v-if="state.isLogin"
        autocomplete="off"
        ref="loginForm"
        layout="horizontal"
        :model="formData"
        :rules="loginRules"
      >
        <Form.Item name="userName">
          <Input v-model:value="formData.userName" placeholder="请输入手机号码" />
        </Form.Item>
        <Form.Item name="password">
          <Input v-model:value="formData.password" type="password" placeholder="请输入账号密码" />
        </Form.Item>
      </Form>
      <Form
        v-if="!state.isLogin"
        autocomplete="off"
        ref="registerForm"
        layout="horizontal"
        :model="formData"
        :rules="registerRules"
      >
        <Form.Item name="userName">
          <Input v-model:value="formData.userName" placeholder="请输入手机号码" />
        </Form.Item>
        <Form.Item name="password">
          <Input v-model:value="formData.password" type="password" placeholder="请输入账号密码" />
        </Form.Item>
        <Form.Item name="checkPassword">
          <Input
            v-model:value="formData.checkPassword"
            type="password"
            placeholder="请输入账号密码"
          />
        </Form.Item>
      </Form>
    </div>
    <div class="mt-12">
      <button
        class="w-full h-10 text-white bg-purple-700 rounded-full hover:bg-purple-800"
        @click="login"
        v-show="state.isLogin"
        >登录</button
      >
      <button
        class="w-full h-10 text-white bg-purple-700 rounded-full hover:bg-purple-800"
        @click="register"
        v-show="!state.isLogin"
        >注册</button
      >
    </div>
    <div class="mt-8 text-purple-400">
      <p class="cursor-pointer">忘记密码？</p>
      <p>----------------- or -----------------</p>
      <div class="flex justify-around text-3xl text-purple-200">
        <span @click="appLogin('qq')"
          ><Icon
            class="cursor-pointer hover:text-purple-400"
            icon="ant-design:qq-circle-filled"
            size="32"
        /></span>
        <span @click="appLogin('wx')"
          ><Icon
            class="cursor-pointer hover:text-purple-400"
            icon="ant-design:wechat-outlined"
            size="32"
        /></span>
        <span @click="appLogin('alipay')"
          ><Icon class="cursor-pointer hover:text-purple-400" icon="ri:alipay-fill" size="32"
        /></span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { RuleObject } from 'ant-design-vue/lib/form/interface';
  import logo from '/@/assets/images/logo.png';
  import { reactive, ref, unref } from 'vue';

  import { Icon } from '/@/components';
  import { Form, Input, message } from 'ant-design-vue';
  // import { useStore } from 'vuex';
  import { useRoute, useRouter } from 'vue-router';
  import { useUserStore } from '/@/store';

  const namespace = 'user';

  interface formType {
    userName: string;
    password: string;
    checkPassword?: string;
  }

  const router = useRouter();
  const route = useRoute();
  const loginForm = ref();
  const registerForm = ref();
  const store = useUserStore();
  // ✖ 本质是reactive 包裹的对象，不能直接对其解构操作，会失去响应性
  // const { handleLogin, handleRegister } = useUserStore();
  // ✔ pinia 提供storeToRefs() 方法用来解构操作以保持响应性
  // const {handleLogin, handleRegister} = storeToRefs(useUserStore())

  const state = reactive({
    isLogin: true,
  });

  const formData: formType = reactive({
    userName: '',
    password: '',
  });

  const checkPwd = async (_rule: RuleObject, value: any) => {
    if (value === '') {
      return Promise.reject('请再次输入密码！');
    }
    if (value !== formData?.password) {
      return Promise.reject('两次输入密码不一致！');
    }
    if (/^[A-z]\w{5,11}$/g.test(value)) {
      return Promise.resolve();
    }
  };

  const loginRules = {
    userName: [
      {
        required: true,
        pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
        message: '请检查账号是否有误！',
        trigger: 'blur',
      },
    ],
    password: [
      {
        required: true,
        pattern: /^[A-z]\w{5,11}$/g,
        message: '请检查密码格式是否有误！',
        trigger: 'blur',
      },
    ],
  };
  const registerRules = {
    userName: [
      {
        required: true,
        pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
        message: '请检查账号填写是否有误！',
        trigger: 'blur',
      },
    ],
    password: [
      {
        required: true,
        pattern: /^[A-z]\w{5,11}$/g,
        message: '请检查密码格式是否有误！',
        trigger: 'blur',
      },
    ],
    checkPassword: [{ required: true, validator: checkPwd, trigger: 'blur' }],
  };

  async function login() {
    delete formData.checkPassword;
    const res = await loginForm.value.validate();
    if (!res) return;
    await store.handleLogin({ ...formData });
    const nextUrl = route.query.url ? route.query.url : '/';
    router.replace(nextUrl.toString());
  }

  async function register() {
    const res = await registerForm.value.validate();
    if (!res) return;
    await store.handleRegister({ ...formData });
    router.push('/');
  }

  function appLogin(name) {
    message.error('小雅正在努力实现！');
    return name;
  }

  function loginHandle() {
    state.isLogin = true;
  }

  function registerHandle() {
    state.isLogin = false;
  }
</script>
<style lang="less"></style>

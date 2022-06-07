<template>
  <div class="container-home">
    <CardList anmiation="fade" @change="getData" />
    <Button type="primary" @click="handleRequest">请求错误</Button>
    <Button type="primary" @click="handleError('resource')">资源错误</Button>
    <Button type="primary" @click="handleReject">promiseReject</Button>
    <Button type="primary" @click="handleRequest">请求错误</Button>
    <Button type="primary" @click="run">KOAcompose</Button>
  </div>
</template>

<script setup lang="ts">
  import moment from 'moment';
  import { onMounted, onUnmounted, ref, reactive } from 'vue';
  import { getMenuList, getMenuListError } from '/@/api/menu_list';
  // import CardList from './components/cardList.vue';
  import CardList from '/@/view/home/components/cardList.vue';
  import { Button, DatePicker } from 'ant-design-vue';

  const buttonEle = ref();
  const state = reactive({
    date: null,
    defaultDate: moment('2021-10-11', 'YYYY-MM-DD'),
    cardList: [],
    middleware: [],
  });

  function listenScroll() {
    // window.addEventListener('scroll', () => getElementPosition(), true);
  }

  function getWindowsSize() {
    const scrollTop = document.body.scrollTop;
    const clientHeight = document.body.clientHeight;
    const scrollHeight = document.body.scrollHeight;
  }

  function getElementPosition() {
    const docTop = buttonEle.value.getBoundingClientRect().top;
    const docIsShow = document.documentElement.clientHeight - docTop > 0;
  }

  async function getData(callBack = () => {}) {
    const params = { page: 1, pageSize: 10 };
    const { list } = await getMenuList(params);
    state.cardList = state.cardList.concat(list);
    if (state.cardList.length > 30) callBack();
  }

  async function handleMore() {
    await getData();
  }

  async function handleRequest() {
    const params = { page: 1, pageSize: 10 };
    await getMenuListError(params);
  }

  function handleReject() {
    return Promise.reject('promiseReject');
  }

  function handleError(type) {
    switch (type) {
      case 'resource':
        throw new Error('资源异常错误');
    }
  }

  let mw1 = async function (ctx, next) {
    console.log('1中间件');
    await next();
    console.log('1后');
  };
  let mw2 = async function (ctx, next) {
    console.log('2中间件');
    await next();
    console.log('2后');
  };
  let mw3 = async function (ctx, next) {
    console.log('3中间件');
    await next();
    console.log('3后');
  };
  let mw4 = async function (ctx, next) {
    console.log('4中间件');
  };

  function use(mw) {
    state.middleware.push(mw);
  }

  function compose(middleware) {
    return (ctx, next) => {
      return dispatch(0);
      function dispatch(i) {
        const fn = middleware[i];
        if (!fn) return;
        return fn(ctx, dispatch.bind(null, i + 1));
      }
    };
  }

  function run() {
    use(mw1);
    use(mw2);
    use(mw3);
    use(mw4);
    compose(state.middleware)();
  }

  onMounted(() => {
    // listenScroll();
    getData();
  });
  onUnmounted(() => {
    window.removeEventListener('scroll', listenScroll);
  });
</script>

<style lang="less" scoped>
  .container-home {
    // height: 2000px;
    background-color: rgb(247, 253, 255);
    scroll-behavior: smooth;
    .button {
      margin-top: 1400px;
    }
  }
</style>

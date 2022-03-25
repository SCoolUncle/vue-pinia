<template>
  <div class="container-home">
    <CardList :list="state.cardList" anmiation="fade" @change="getData" />
  </div>
</template>

<script setup lang="ts">
  import moment from 'moment';
  import { onMounted, onUnmounted, ref, reactive } from 'vue';
  import { getMenuList } from '/@/api/menu_list';
  import CardList from './components/cardList.vue';
  import { Button, DatePicker } from 'ant-design-vue';

  const buttonEle = ref();
  const state = reactive({
    date: null,
    defaultDate: moment('2021-10-11', 'YYYY-MM-DD'),
    cardList: [],
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

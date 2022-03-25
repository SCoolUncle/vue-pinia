<template>
  <transition-group name="imglist" @before-enter="beforEnter" @enter="enter">
    <div
      class="img-container"
      v-for="(item, index) in cardList"
      :data-index="index % state.addNumber"
      :key="item.id"
    >
      <div class="mt-2 mb-2 shadow-md card-list">
        <div class="img-box">
          <img
            src=""
            alt="图片缺失"
            style="width: 100%; height: 100%"
            setsrc="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        </div>
        <div class="content-box" v-if="cardList?.length">
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </transition-group>
  <Button type="primary" @click="goWebTop">回到顶部</Button>
  <div class="load-index" ref="bottomMark"> </div>
</template>
<script lang="ts" setup>
  import {
    ref,
    reactive,
    defineProps,
    defineEmits,
    computed,
    onMounted,
    onUpdated,
    watch,
  } from 'vue';
  import { Button } from 'ant-design-vue';
  import { createIntersectionListen } from '/@/utils/libs/utils';

  const props = defineProps({
    list: Array,
  });

  const emits = defineEmits(['change']);

  const cardList = computed(() => props.list);

  const bottomMark = ref();

  const state = reactive({
    cardOldLength: cardList.value?.length,
    renderIndex: 1,
    // 每次加载卡片的数量
    addNumber: 0,
  });

  function beforEnter(el) {
    el.style.opacity = 0;
  }

  function enter(el, done) {
    // 需要获取新添加的数量来确定延迟时间
    if (state.renderIndex < state.addNumber) state.renderIndex++;
    state.cardOldLength = cardList.value?.length;
    let delay = Number(el.dataset.index) * 100;
    setTimeout(() => {
      el.style.opacity = 1;
      el.style.transition = 'opacity 1s';
      el.style.animation = 'cardin 1s ease-in 0.5s infinite normal running';
      done();
    }, delay);
  }

  async function bindIntersectionEvent() {
    const intance = createIntersectionListen(null, 1, (entries) => {
      // 非底部不加载
      const isLast = entries[0].boundingClientRect.y === entries[0].rootBounds.height;
      if (entries[0].isIntersecting && isLast) {
        emits('change', () => {
          intance.unobserve(bottomMark.value);
          bottomMark.value.innerHTML = '没有更多数据了';
        });
      }
    });
    intance.observe(bottomMark.value);
  }

  async function bindImg() {
    const imgEllist = document.querySelectorAll('img[setsrc]');
    const int = createIntersectionListen(null, 0, (entries, observe) => {
      console.log(entries);
      entries.forEach((item) => {
        let imgEle = item.target;
        if (item.isIntersecting) {
          imgEle.src = imgEle.getAttribute('setsrc');
          observe.unobserve(imgEle);
          imgEle.removeAttribute('setsrc');
        }
      });
    });
    imgEllist.forEach((item) => {
      int.observe(item);
    });
  }

  function goWebTop() {
    console.log(document.body.scrollTop);
    document.body.scrollTo({ top: 10, behavior: 'smooth' });
  }

  watch(
    () => cardList.value,
    (v, ov) => {
      state.addNumber = v?.length - ov?.length;
    },
  );

  onUpdated(async () => {
    bindImg();
  });

  onMounted(async () => {
    bindIntersectionEvent();
    bindImg();
  });
</script>
<style lang="less" scoped>
  .card-list {
    min-height: 200px;
    .img-box {
      display: flex;
      width: 100%;
      align-items: center;
      height: 15rem;
      overflow: hidden;
    }
    .load-index {
      display: none;
      padding: 20px;
    }
  }
  @keyframes cardin {
    from {
      transform: translate(0px, 20px);
      opacity: 0;
    }
    to {
      transform: translate(0px, -20px);
      opacity: 1;
    }
  }
  // .imglist-enter-from {
  //   transform: translate(0px, -20px);
  // }
  // .imglist-enter-active {
  //   animation: cardin 0.5s ease-in 0.5s 1;
  // }
  // .imglist-leave-to {
  //   animation: cardout 0.5s ease-in 0s 1;
  // }
</style>

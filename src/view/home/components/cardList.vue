<template>
  <transition-group name="imglist" @before-enter="beforEnter" @enter="enter">
    <div v-for="(item, index) in cardList" :key="item.id">
      <div class="mt-2 mb-2 shadow-md card-list">
        <div class="img-box">
          <img
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            alt="图片缺失"
            style="width: 100%"
          />
        </div>
        <div class="content-box">
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </transition-group>
  <div class="load-index" ref="bottomMark"></div>
</template>
<script lang="ts" setup>
  import { ref, reactive, defineProps, defineEmits, computed, onMounted, watch } from 'vue';

  const props = defineProps({
    list: Array,
  });

  const emits = defineEmits(['change']);

  const cardList = computed(() => props.list);

  const bottomMark = ref();

  const state = reactive({
    showCard: false,
    cardOldLength: cardList.value?.length,
    renderIndex: 1,
    addNumber: 0,
  });

  function beforEnter(el) {
    el.style.opacity = 0;
  }

  function enter(el, done) {
    // 需要获取新添加的数量来确定延迟时间
    if (state.renderIndex < state.addNumber) state.renderIndex++;
    state.cardOldLength = cardList.value?.length;
    let delay = el.dataset.index * 100;
    setTimeout(() => {
      el.style.animation = 'cardin 0.5s ease-in 0.5s 1';
      el.style.opacity = 1;
      done();
    }, delay);
  }

  const eleAddListener: (currentEle: Element, targetEle: Element | null, size: number) => void =
    function (currentEle, targetEle = null, size = 1) {
      let ioInstance: any = null;
      return function () {
        ioInstance = new IntersectionObserver(handleIntersection, {
          root: targetEle || null,
          threshold: size,
        });
        ioInstance.observe(currentEle);
        ioInstance.unobserve(currentEle);
      };
    };

  function handleIntersection(entries, observer) {
    console.log(entries, observer);
  }

  watch(
    () => cardList.value,
    (v, ov) => {
      state.addNumber = v?.length - ov?.length;
    },
  );

  onMounted(() => {
    eleAddListener();
    state.showCard = !state.showCard;
  });
</script>
<style lang="less" scoped>
  .card-list {
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

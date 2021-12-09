<template>
  <svg :class="[$attrs.class, 'svgicon']" aria-hidden="true" :style="getStyle" v-bind="$attrs">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';
  export default defineComponent({
    props: {
      prefix: {
        type: String,
        default: 'icon',
      },
      name: String,
      size: {
        type: [Number, String],
        default: 16,
      },
    },
    setup(props) {
      const symbolId = computed(() => `#${props.prefix}-${props.name}`);
      const getStyle = computed(() => {
        const { size } = props;
        const s = size + 'px';
        return {
          width: s,
          height: s,
        };
      });
      return {
        symbolId,
        getStyle,
      };
    },
  });
</script>

<style lang="less" scoped>
  .svgicon {
    display: inline-block;
    overflow: hidden;
  }
</style>

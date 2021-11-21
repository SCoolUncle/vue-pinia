<template>
    <SvgIcon v-if="isSvgIcon" :class="[$attrs.class]" :name="getSvgIcon"></SvgIcon>

    <span v-else :class="[$attrs.class, 'iconify anticon']" :data-icon="icon" :style="getStyle"></span>
</template>

<script lang="ts">
   import { computed, defineComponent } from 'vue'
   import SvgIcon from './svgIcon.vue';
   export default defineComponent({
    components: { SvgIcon },
    props: {
        prefix: {
            type: String,
            default: "icon",
        },
        icon: String,
        size: {
            type: [Number, String],
            default: 16
        },
        color:String
    },
    setup(props) {
        const isSvgIcon = computed(() => props.icon.includes("|svg"));
        const getSvgIcon = computed(() => props.icon.replace('|svg', ''));

        const getStyle = computed(() => {
          const { size, color } = props;
          let fs = size;
          return {
            fontSize: `${fs}px`,
            color,
            display: 'inline-flex',
          };
        })

        return {
            getStyle,
            isSvgIcon,
            getSvgIcon
        };
    },
})
   
</script>

<style lang="less" scoped>
  
</style>
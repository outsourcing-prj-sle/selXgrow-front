<template>
  <div class="flex flex-col items-center">
    <div class="font-bold mb-2">{{ title }}</div>
    <div
      :style="{
        display: 'grid',
        gap: '10px',
        'grid-template-columns': 'repeat(2, 1fr)',
      }"
    >
      <div
        v-for="(item, index) in itemList"
        :key="`${title}list${index}`"
        class="w-full h-full border-2 border-solid border-green-400 flex justify-center items-center cursor-pointer"
        :class="selected === index + 1 && 'border-red-600'"
        @click="selectItem(index + 1)"
      >
        <img :src="item" class="w-full h-full" alt="item" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Eye',
    },
    itemList: {
      type: Array,
      default: () => {},
    },
    selected: {
      type: Number,
      default: null,
    },
  },
  setup(props, { emit }) {
    const selectItem = (index) => {
      emit('selectItem', index);
    };
    return { selectItem };
  },
};
</script>

<style>
/* Footer 스타일 */
</style>

<template>
  <div
    class="flex flex-1 mr-2 pl-8 py-6 text-2xl font-bold text-gray-600 rounded-e-2xl"
    :class="{
      'text-white bg-gray-600': isSelected,
    }"
    @click="$emit('click')"
  >
    {{ text }}
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
</style>

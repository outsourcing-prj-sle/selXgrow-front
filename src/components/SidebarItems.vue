<template>
  <div
    class="flex flex-col text-left px-8 py-4 relative"
    :class="{
      'bg-[#0c0a35] active': isSelected,
    }"
    @click="$emit('click')"
  >
    <p class="text-white text-opacity-50">
      <slot>{{ text }}</slot>
    </p>
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
.active::after {
  content: '>';
  position: absolute;
  color: #d3f571;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
}
.active>p {
  color: #d3f571;
}
</style>

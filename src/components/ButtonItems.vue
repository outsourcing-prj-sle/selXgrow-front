<template>
  <button
    v-html="selectedItem.content"
    :style="[
      buttonStyles,
      !isAllowed ? { opacity: '0.5', 'background-color': '#DADFF5' } : '',
    ]"
    type="button"
    :disabled="!isAllowed"
  ></button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  isAllowed: {
    type: Boolean,
    default: true,
  },
});

const meta = [
  {
    name: 'prev',
    content: '←',
    background: '#82c2fd',
    px: 24,
    py: 8,
  },
  {
    name: 'next',
    content: '→',
    background: '#82c2fd',
    px: 24,
    py: 8,
  },
  {
    name: 'calendarPrev',
    content: '<',
    background: '#e1f0ff',
    px: 8,
    isAspect: true,
    text: 18,
  },
  {
    name: 'calendarNext',
    content: '>',
    background: '#e1f0ff',
    px: 8,
    isAspect: true,
    text: 18,
  },
  {
    name: 'start',
    content: "START <span class='text-[#82C2FD]'>→<span>",
    background: '#3C36A7',
    px: 24,
    py: 8,
    text: 18,
    font: 'white',
  },
];

const selectedItem = computed(() => {
  return meta.find((m) => m.name === props.name);
});

const buttonStyles = computed(() => {
  const bgColor = selectedItem.value?.background
    ? `background-color: ${selectedItem.value.background}`
    : '';
  const fontColor = selectedItem.value?.font
    ? `color: ${selectedItem.value.font}`
    : '';
  const px = selectedItem.value?.px
    ? `padding-left: ${selectedItem.value.px}px; padding-right: ${selectedItem.value.px}px;`
    : '';
  const py = selectedItem.value?.py
    ? `padding-top: ${selectedItem.value.py}px; padding-bottom: ${selectedItem.value.py}px;`
    : '';
  const isAspect = selectedItem.value?.isAspect ? 'aspect-ratio: 1' : '';
  const text = selectedItem.value?.text
    ? `font-size: ${selectedItem.value.text}px`
    : 'font-size: 24px';

  return [
    px,
    py,
    'font-weight: bold',
    text,
    'border-radius: 9999px',
    bgColor,
    fontColor,
    isAspect,
  ];
});
</script>

<style scoped></style>

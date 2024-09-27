<template>
  <div>
    <picture
      class="bg-[#f3f5f7] rounded-full flex items-center justify-center aspect-square"
      :style="`width: ${size * 4}px`"
    >
      <img
        class="w-full aspect-square"
        :src="require(`@/assets/img/moods/${selectedMood.icons[props.level - 1]}.svg`)"
        alt="mood icon"
      />
    </picture>
    <p
      :class="`font-bold p-2.5 leading-none text-[${fontSize}px]`"
      :style="`color: ${textColor}; font-size: ${fontSize}px`"
      v-if="!!textContent"
    >
      {{ textContent }}
    </p>
  </div>
</template>

<script setup>
import { MOODS } from '@/utils/constant';
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    default: 5,
  },
  textContent: {
    type: String,
  },
  textColor: {
    type: Text,
  },
  size: {
    type: Number,
    default: 24,
  },
  fontSize: {
    type: Number,
    default: 16,
  },
});

const selectedMood = computed(() => {
  return MOODS[props.name];
});
</script>

<style scoped></style>

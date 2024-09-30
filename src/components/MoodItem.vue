<template>
  <div>
    <picture
      :class="`bg-[#f3f5f7] rounded-full flex items-center justify-center aspect-square ${isBorder && 'border-4 border-[#6f7182]'} ${isSmall && 'border-[15px]'}`"
      :style="`width: ${size * 4}px; ${isSmall && 'border-color: rgba(215, 219, 226, 0.3);'}`"
    >
      <img
        :class="`w-full aspect-square ${isSmall && 'border-2 border-[rgb(217,220,226)] rounded-full'}`"
        :src="
          require(
            `@/assets/img/diary/moods/${selectedMood.icons[props.level - 1]}.svg`
          )
        "
        alt="mood icon"
      />
    </picture>
    <p
      :class="`font-bold py-2.5 leading-none cursor-default text-[${fontSize}px] whitespace-nowrap`"
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
  isBorder: {
    type: String,
  },
  isSmall: {
    type: Boolean,
  },
});

const selectedMood = computed(() => {
  return MOODS[props.name];
});
</script>

<style scoped></style>

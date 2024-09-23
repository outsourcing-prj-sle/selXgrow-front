<template>
  <div class="flex flex-col h-full relative">
    <div class="flex flex-col flex-1">
      <div class="flex items-start">
        <RobotItem />
        <p
          class="font-bold px-4 py-2 mt-4 rounded-md bg-white border-2 border-[#F6F0FF] text-left w-full"
        >
          First, pick the picture and word that best describes how you are
          feeling right now.
        </p>
      </div>
      <!-- Circular Mood Selector -->
      <div class="flex-1 flex justify-center w-full mt-8">
        <div
          class="relative w-[350px] h-[350px] flex justify-center items-center rounded-full border-[74px] border-[#F5F5FC]"
        >
          <!-- Center Text -->
          <div
            class="absolute flex flex-col justify-center items-center w-full h-full"
          >
            <h2 class="text-2xl font-bold text-blue-800">
              How do you feel<br />right now?
            </h2>
            <div
              class="absolute w-full bottom-10 left-1/2 transform -translate-x-1/2 text-center"
            >
              <p
                v-if="selectedName !== null"
                :style="{
                  backgroundColor: selectedColor,
                  width: 'auto',
                  display: 'inline-block',
                }"
                class="text-white text-base font-semibold mt-1 px-4 py-0.5 rounded-full"
              >
                {{ selectedName }}
              </p>
            </div>
          </div>

          <!-- Mood Options -->
          <div
            v-for="(mood, index) in moods"
            :key="index"
            :style="getPosition(index)"
            class="absolute w-[100px] h-[100px] flex flex-col justify-center items-center rounded-full cursor-pointer"
            @click="setMood(index)"
          >
            <!-- Replace with actual image/icon -->
            <div class="rounded-full flex items-center justify-center">
              <img
                :src="require(`@/assets/img/mood/${mood.icon}.svg`)"
                :class="`${selectedMood === index ? 'w-[100px]' : 'w-[74px]'}`"
                alt="mood icon"
              />
            </div>
            <p
              :style="{
                ...getTextPosition(index),
                color: selectedMood === index ? `white` : mood.color,
                backgroundColor:
                  selectedMood === index ? mood.color : `transparent`,
                visibility: selectedMood === index ? `hidden` : `visible`,
              }"
              :class="`text-center text-sm mt-1 ${selectedMood !== index && 'w-16'} ${selectedMood === index && `px-4 py-0.5 rounded-full`}`"
            >
              {{ mood.name }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div
      class="absolute bottom-0 h-[70px] w-full flex justify-end items-center -z-10"
    >
      <ButtonItems name="next" @click="() => router.push({ name: 'diary2' })" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import router from '@/router';
import RobotItem from '@/components/RobotItem.vue';
import ButtonItems from '@/components/ButtonItems.vue';

import { useDiaryStore } from '@/store/diaryStore.js';
const diaryStore = useDiaryStore();

const selectedMood = ref(null);
const selectedColor = ref(null);
const selectedName = ref(null);

const moods = ref([
  {
    name: 'sad',
    icon: 'diary1-sad-icon',
    color: '#007CD6',
  },
  {
    name: 'angry',
    icon: 'diary1-angry-icon',
    color: '#B81521',
  },
  {
    name: 'excited',
    icon: 'diary1-excited-icon',
    color: '#F96D30',
  },
  {
    name: 'content',
    icon: 'diary1-content-icon',
    color: '#D9B341',
  },
  {
    name: 'thankful',
    icon: 'diary1-thankful-icon',
    color: '#BFBB30',
  },
  {
    name: 'proud',
    icon: 'diary1-proud-icon',
    color: '#A0BF00',
  },
  {
    name: 'happy',
    icon: 'diary1-happy-icon',
    color: '#CFAE08',
  },
  {
    name: 'confused',
    icon: 'diary1-confused-icon',
    color: '#0F9B35',
  },
  {
    name: 'bored',
    icon: 'diary1-bored-icon',
    color: '#812088',
  },
  {
    name: 'embarrassed',
    icon: 'diary1-embarrassed-icon',
    color: '#F1649B',
  },
  {
    name: 'worried',
    icon: 'diary1-worried-icon',
    color: '#57B109',
  },
]);

const getPosition = (index) => {
  const total = moods.value.length;
  const angle = (index / total) * (2 * Math.PI) - (130 * Math.PI) / 180;
  const baseRadius = 150;
  const radius = selectedMood.value === index ? baseRadius + 30 : baseRadius;
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle) + 12;
  return {
    transform: `translate(${x}px, ${y}px)`,
  };
};

const getTextPosition = (index) => {
  const total = moods.value.length;
  const angle = (index / total) * (2 * Math.PI) - (140 * Math.PI) / 180;
  const baseOffset = 58;
  const offset = selectedMood.value === index ? baseOffset + 20 : baseOffset;
  const xOffset = offset * Math.cos(angle) - 3;
  const yOffset =
    offset * Math.sin(angle) - (selectedMood.value === index ? 62 : 52);

  const nonSelectedAdjustment = index !== 0 && index < 7 ? 10 : -10;
  const selectedAdjustment = index !== 0 && index < 7 ? 20 : -20;
  const adjustment =
    selectedMood.value === index ? selectedAdjustment : nonSelectedAdjustment;
  return {
    transform: `translate(${xOffset + adjustment}px, ${yOffset}px)`,
  };
};

// Handle mood selection
const setMood = (index) => {
  if (selectedMood.value === index) {
    selectedMood.value = null;
    selectedColor.value = null;
    selectedName.value = null;

    diaryStore.setColor('');
    diaryStore.setIcon('');
    diaryStore.setMood('');
  } else {
    selectedMood.value = index;
    selectedColor.value = moods.value[index].color;
    selectedName.value = moods.value[index].name;

    diaryStore.setColor(moods.value[index].color);
    diaryStore.setIcon(moods.value[index].icon);
    diaryStore.setMood(moods.value[index].name.toLowerCase());
  }
};
</script>

<style scoped></style>

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
                :src="require(`@/assets/img/diary/step1/${mood.icon}.svg`)"
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
      class="absolute bottom-0 h-[70px] w-full flex justify-end items-center"
    >
      <ButtonItems class="z-10" name="next" @click="handleClickNext" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import router from '@/router';
import RobotItem from '@/components/RobotItem.vue';
import ButtonItems from '@/components/ButtonItems.vue';

import { useDiaryStore } from '@/store/diaryStore.js';
import { MOODS } from '@/utils/constant';
const diaryStore = useDiaryStore();

const selectedMood = ref(null);
const selectedColor = ref(null);
const selectedHighlightColor = ref(null);
const selectedName = ref(null);

const handleClickNext = () => {
  if(selectedMood.value !== null) router.push({ name: 'diary2' });
  else alert('Pick the picture first.');
}

const moods = ref([
  {
    name: 'Sad',
    icon: 'diary1-sad-icon',
    color: MOODS.Sad.color,
    highlightColor: MOODS.Sad.highlightColor,
  },
  {
    name: 'Angry',
    icon: 'diary1-angry-icon',
    color: MOODS.Angry.color,
    highlightColor: MOODS.Angry.highlightColor,
  },
  {
    name: 'Excited',
    icon: 'diary1-excited-icon',
    color: MOODS.Excited.color,
    highlightColor: MOODS.Excited.highlightColor,
  },
  {
    name: 'Content',
    icon: 'diary1-content-icon',
    color: MOODS.Content.color,
    highlightColor: MOODS.Content.highlightColor,
  },
  {
    name: 'Thankful',
    icon: 'diary1-thankful-icon',
    color: MOODS.Thankful.color,
    highlightColor: MOODS.Thankful.highlightColor,
  },
  {
    name: 'Proud',
    icon: 'diary1-proud-icon',
    color: MOODS.Proud.color,
    highlightColor: MOODS.Proud.highlightColor,
  },
  {
    name: 'Happy',
    icon: 'diary1-happy-icon',
    color: MOODS.Happy.color,
    highlightColor: MOODS.Happy.highlightColor,
  },
  {
    name: 'Confused',
    icon: 'diary1-confused-icon',
    color: MOODS.Confused.color,
    highlightColor: MOODS.Confused.highlightColor,
  },
  {
    name: 'Bored',
    icon: 'diary1-bored-icon',
    color: MOODS.Bored.color,
    highlightColor: MOODS.Bored.highlightColor,
  },
  {
    name: 'Embarrassed',
    icon: 'diary1-embarrassed-icon',
    color: MOODS.Embarrassed.color,
    highlightColor: MOODS.Embarrassed.highlightColor,
  },
  {
    name: 'Worried',
    icon: 'diary1-worried-icon',
    color: MOODS.Worried.color,
    highlightColor: MOODS.Worried.highlightColor,
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
    selectedHighlightColor.value = null;
    selectedName.value = null;

    diaryStore.setColor('');
    diaryStore.setHighlightColor('');
    diaryStore.setIcon('');
    diaryStore.setMood('');
  } else {
    selectedMood.value = index;
    selectedColor.value = moods.value[index].color;
    selectedHighlightColor.value = moods.value[index].highlightColor;
    selectedName.value = moods.value[index].name;

    diaryStore.setColor(moods.value[index].color);
    diaryStore.setHighlightColor(moods.value[index].highlightColor);
    diaryStore.setIcon(moods.value[index].icon);
    diaryStore.setMood(moods.value[index].name);
  }
};
</script>

<style scoped></style>

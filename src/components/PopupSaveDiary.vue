<template>
  <div
    class="w-full flex flex-col h-full bg-white bg-opacity-50 rounded-2xl justify-center items-center absolute top-0 left-0 z-50"
  >
    <div
      class="w-[700px] pl-[150px] pr-[110px] text-left text-[#716CC2] text-base font-medium mb-2"
    >
      <p>
        Does this look correct?
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="inline w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        to submit, or click the<br />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="inline w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5L4 10m0 0l5 5m-5-5h12a4 4 0 110 8h-1"
          />
        </svg>

        to go back and make changes.
      </p>
    </div>
    <div
      class="relative w-[700px] h-[280px] bg-[#19146A] rounded-full text-white flex flex-col items-center"
    >
      <RobotItem class="absolute -top-[50px] left-[30px] scale-125" />
      <!-- 뒤로가기 -->
      <button
        class="absolute top-[110px] -left-[30px] w-[60px] h-[60px] bg-blue-400 rounded-full text-white"
        @click="closePopup"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="inline w-8 h-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5L4 10m0 0l5 5m-5-5h12a4 4 0 110 8h-1"
          />
        </svg>
      </button>
      <!-- 체크 -->
      <button
        class="absolute -bottom-[30px] left-[320px] w-[60px] h-[60px] bg-purple-500 rounded-full text-white"
        @click="goHistory"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="inline w-8 h-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </button>
      <div class="text-[#A960FC] text-lg font-semibold mt-6">
        How I feel right now
      </div>
      <div class="text-white text-2xl font-semibold">
        For what reason are you feeling {{ mood }}?
      </div>
      <div class="text-[#A960FC] text-lg font-semibold mt-3">
        How much do I feel
      </div>
      <div class="text-white text-2xl font-semibold">{{ levelName }}</div>
      <div class="text-[#A960FC] text-lg font-semibold mt-3">
        The reason why I feel it
      </div>
      <div class="text-white text-2xl font-semibold">
        {{ reason }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import router from '@/router';
import RobotItem from './RobotItem.vue';

import { usePopupStore } from '@/store/popupStore.js';
const popupStore = usePopupStore();

import { useDiaryStore } from '@/store/diaryStore.js';
const diaryStore = useDiaryStore();

const mood = computed(() => {
  return diaryStore.mood;
});
const levelName = computed(() => {
  return diaryStore.levelName;
});
const reason = computed(() => {
  return diaryStore.reason;
});

const closePopup = async () => {
  popupStore.openSaveDiaryPopup();
};

const goHistory = () => {
  closePopup();
  router.push({ name: 'diaryHistory' });
};
</script>

<style scoped></style>

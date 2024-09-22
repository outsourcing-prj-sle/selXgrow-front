<template>
  <div class="w-full flex h-full bg-white justify-center items-center">
    <div class="relative">
      <RobotItem />
    </div>
  </div>
</template>

<script setup>
import router from '@/router';
import RobotItem from './RobotItem.vue';

import { usePopupStore } from '@/store/popupStore.js';
const popupStore = usePopupStore();

const closePopup = () => {
  popupStore.openSaveDiaryPopup();
};

const goHistory = () => {
  router.push({ name: 'diaryHistory' });
};
</script>

<style scoped></style>

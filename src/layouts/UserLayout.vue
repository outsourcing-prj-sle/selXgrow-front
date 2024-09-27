<template>
  <div
    class="w-screen h-screen bg-[url('@/assets/img/bg.svg')] bg-no-repeat bg-cover"
  >
    <div class="flex w-screen h-[95vh]">
      <AppSidebar />
      <div class="flex-1 mt-12 px-12 flex flex-col relative">
        <PopupSaveDiary v-if="isOpenedSaveDiaryPopup" />
        <CommonPopup v-if="isOpenedCommonPopup" />
        <div class="flex">
          <AppHeader />
        </div>
        <div class="flex flex-col flex-1">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import AppSidebar from '@/components/AppSidebar.vue';
import PopupSaveDiary from '@/components/PopupSaveDiary.vue';
import CommonPopup from '@/components/CommonPopup.vue';

import { usePopupStore } from '@/store/popupStore.js';
const popupStore = usePopupStore();

onMounted(() => {
  const routerView = document.querySelector('router-view');
  console.log('safdasdasds');
  console.log(AppSidebar);
  console.log('router-view:', routerView);
});

const isOpenedSaveDiaryPopup = computed(() => {
  return popupStore.isOpenedSaveDiaryPopup;
});

const isOpenedCommonPopup = computed(() => {
  return popupStore.isOpenedCommonPopup;
});
</script>

<style scoped></style>

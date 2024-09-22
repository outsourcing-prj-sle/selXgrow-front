<template>
  <div class="w-2/3 flex h-full bg-[#19146A] rounded-2xl justify-between absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
    <div class="flex-1 pl-8 py-2">
      <div class="w-full h-full pr-4 overflow-y-scroll popup-custom relative">
        <div class="absolute inset-0 w-full h-full bg-[rgba(0,0,0,0.3)]">
          <div class="loading-spinner"></div>
        </div>
        <VuePdfEmbed source="/resources/pdf/test.pdf" />
      </div>
    </div>
    <div>
      <button class="text-[#8F8DB4] py-4 px-6 text-2xl" type="button" @click="closePopup">x</button>
    </div>
  </div>
</template>

<script setup>
import { usePopupStore } from '@/store/popupStore.js';
import VuePdfEmbed from 'vue-pdf-embed';

const popupStore = usePopupStore();

const closePopup = async () => {
  popupStore.openCommonPopup();
};
</script>

<style scoped>
  .popup-custom::-webkit-scrollbar {
    width: 12px;
    background-color: #3e3a7a;
  }

  .popup-custom::-webkit-scrollbar-thumb {
    background: #82c2fd;
    border-radius: 20px;
    border: 0;
  }

  .loading-spinner {
    position: absolute;
    width: 50px;
    height: 50px;
    top: calc(50% - 25px);
    left: calc(50% - 25px);
    border: 3px solid rgba(255, 255, 255, 0.3);
    box-sizing: border-box;
    border-top-color: white;
    border-radius: 100%;
    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    100%
    {
      transform: rotate(360deg);
    }
  }
</style>
  
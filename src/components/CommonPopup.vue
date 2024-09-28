<template>
  <button class="absolute inset-0 w-full h-full z-40" @click="closePopup"></button>
  <div class="w-[60%] flex h-5/6 bg-[#4D4C61] rounded-2xl justify-between absolute top-1/2 left-1/2 -translate-x-[38%] -translate-y-[45%] z-50 shadow-xl">
    <div class="flex-1 pl-8 py-2">
      <div class="w-full h-full pr-4 overflow-y-scroll popup-custom relative">
        <div class="absolute inset-0 w-full h-full bg-[rgba(0,0,0,0.3)]">
          <div class="loading-spinner"></div>
        </div>
        <VuePdfEmbed :source="`/grow/resources/pdf/${pdf}.pdf`" />
      </div>
    </div>
    <div>
      <button class="text-[#8F8DB4] py-4 pr-3 pl-1 text-2xl" type="button" @click="closePopup">
        <img src="@/assets/img/close.svg" alt="close" />
      </button>
    </div>
    <button class="absolute bottom-0 -left-14 text-black z-50 bg-[#3C36A7] rounded-lg flex flex-col justify-items items-center px-2.5 pt-2 pb-1 gap-y-0.5" @click="printPdf">
      <img class="w-5" src="@/assets/img/print.svg" alt="print" />
      <p class="text-[rgba(255,255,255,0.4)] text-[10px]">PRINT</p>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { usePopupStore } from '@/store/popupStore.js';
import VuePdfEmbed from 'vue-pdf-embed';
import { PDFS } from '@/utils/constant'

const popupStore = usePopupStore();

const closePopup = async () => {
  popupStore.openCommonPopup();
};

const pdf = computed(() => {
  const id = popupStore.commonPopupId;
  return PDFS[id - 1];
});

const printPdf = () => {
  closePopup();

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const pdfUrl = `/grow/resources/pdf/${pdf.value}.pdf`;

  if (isMobile) {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${pdf.value}.pdf`;
    link.click();
  } else {
    const pdfWindow = window.open(pdfUrl);
    pdfWindow.onload = function() {
      pdfWindow.print();
    };
  }
};
</script>

<style scoped>
  .popup-custom::-webkit-scrollbar {
    width: 12px;
    background-color: rgba(255, 255, 255, 0.3);
  }

  .popup-custom::-webkit-scrollbar-thumb {
    background: #82C2FD;
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
  
<template>
  <div
    class="absolute bg-white left-1/2 -translate-x-1/2 top-[129px] border-[#19146A] rounded-[20px] border-[5px] w-[540px] flex flex-col justify-center items-center py-[56px]"
  >
    <span class="text-[#19146A] text-xl font-semibold">
      There will be a <span class="font-extrabold">3, 2, 1 countdown </span
      ><br />
      before each photo appears.
    </span>
    <img
      :src="require(`@/assets/img/timer_${timer}.svg`)"
      class="w-[114px] mt-6"
      alt="watch_popup_left"
    />
  </div>
</template>

<script setup>
import { watch, ref } from 'vue';
import { waitSec } from '@/utils/utils';

const props = defineProps({
  showTimer: {
    type: Boolean,
    deafult: false,
  },
});
const timer = ref(3);

watch(
  () => props.showTimer,
  async (newVal) => {
    if (newVal) {
      timer.value = 3;
      await waitSec(3);
      timer.value = 2;
      await waitSec(1);
      timer.value = 1;
    }
  },
  { immediate: true }
);
</script>

<style scoped></style>

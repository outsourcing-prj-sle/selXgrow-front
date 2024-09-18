<template>
  <div
    class="fixed top-0 left-0 w-full h-full bg-black opacity-50 font-white flex justify-center items-center text-[30px] z-[1000]"
    v-if="isLoading"
  >
    Loading...
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStateStore } from '@/store/stateStore.js';
export default {
  props: {},
  setup() {
    const stateStore = useStateStore();
    const isLoading = computed(() => {
      console.log(stateStore.popupFlag, stateStore.popupReport, stateStore.isLoading)

      return stateStore.isLoading;
    });
    return { isLoading };
  },
};
</script>

<style>
/* Footer 스타일 */
</style>

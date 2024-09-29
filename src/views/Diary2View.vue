<template>
  <div class="flex flex-col justify-between h-full relative">
    <div>
      <div class="flex items-start">
        <RobotItem />
        <p
          class="font-bold px-4 py-2 mt-4 rounded-md bg-white border-2 border-[#F6F0FF] text-left w-full"
        >
          Next, use the slider to show the
          <span class="underline underline-offset-2">intensity</span>
          of your emotion, or
          <span class="underline underline-offset-2">how much</span>
          you are feeling that way
        </p>
      </div>
      <div class="flex flex-col px-24 justify-center items-center mt-4">
        <p
          class="text-white w-full bg-[#494857] py-4 break-all text-2xl rounded-xl"
        >
          How
          <span class="text-[#80beeb]">{{ mood.toLowerCase() }}</span> do you feel?
        </p>
        <div
          class="flex flex-col w-28 aspect-square bg-[#19146a] rounded-2xl justify-center mt-12 -mb-6"
        >
          <p class="text-white text-4xl">{{ feelScore }}</p>
          <p class="text-white opacity-50">{{ feelDescription }}</p>
        </div>
        <div class="flex justify-between items-center w-full px-8 gap-8">
          <MoodItem :name="mood" level="1" :textContent="`${MOODS_LEVEL[0]}`" isSmall="true" />
          <div
            class="bg-gradient-to-r from-white to-[#8785B2] rounded-2xl flex h-5 w-full justify-between items-center px-2"
          >
            <div class="relative flex items-center" v-for="i in [1, 2, 3, 4, 5]" :key="i">
              <button v-if="feelScore === i"
                class="absolute top-1/2 -left-2.5 -translate-y-1/2 flex items-center" 
                type="button"
                @click="clickFeelScoreHandler(i-1)"
              >
                <img src="@/assets/img/arrow_left.svg" alt="left_arrow" />
              </button>
              <button
                :class="`font-extrabold px-2 py-4 rounded-full text-xs ${feelScore === i ? 'bg-[#524DA1] text-white border-2 border-[#19146A]' : ''}`"
                type="button"
                @click="clickFeelScoreHandler(i)"
              >
                {{ i }}
              </button>
              <button v-if="feelScore === i"
                class="absolute top-1/2 -right-2.5 -translate-y-1/2 flex items-center" 
                type="button"
                @click="clickFeelScoreHandler(i+1)"
              >
                <img src="@/assets/img/arrow_right.svg" alt="right_arrow" />
              </button>
            </div>
          </div>
          <MoodItem :name="mood" level="5" :textContent="`${MOODS_LEVEL[4]}`" />
        </div>
      </div>
    </div>
    <div
      class="absolute bottom-0 h-[70px] w-full flex justify-between items-center"
    >
      <ButtonItems name="prev" @click="() => router.push({ name: 'diary1' })" />
      <ButtonItems name="next" @click="() => router.push({ name: 'diary3' })" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import router from '@/router';

import ButtonItems from '@/components/ButtonItems.vue';
import MoodItem from '@/components/MoodItem.vue';
import RobotItem from '@/components/RobotItem.vue';
import { MOODS_LEVEL } from '@/utils/constant';

import { useDiaryStore } from '@/store/diaryStore.js';
const diaryStore = useDiaryStore();

onMounted(() => {
  diaryStore.setLevel('1')
})

const props = defineProps({
  selectedFeel: {
    type: String,
    required: true,
    default: '',
  },
});

const mood = computed(() => {
  return props.selectedFeel || diaryStore.mood || 'sad';
});
const feelScore = ref(1);

const feelDescription = computed(() => {
  return MOODS_LEVEL[feelScore.value - 1];
});

const clickFeelScoreHandler = (number) => {
  if(number < 1) return;
  if(number > 5) return;
  feelScore.value = number;
  diaryStore.setLevel(number);
  diaryStore.setLevelName(MOODS_LEVEL[number - 1]);
};
</script>

<style scoped>
</style>

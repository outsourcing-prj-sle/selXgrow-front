<template>
  <div class="flex flex-col justify-between h-full relative">
    <div>
      <div class="flex items-start">
        <RobotItem />
        <p
          class="font-bold px-4 py-2 mt-4 rounded-md bg-white border-2 border-[#F6F0FF] text-left w-full"
        >
          Now, select the
          <span class="underline underline-offset-2">reason</span>
          you are feeling this way.
        </p>
      </div>
      <div class="flex flex-col px-24 justify-center items-center mt-4">
        <p
          class="text-white w-full bg-[#494857] py-4 break-all text-2xl rounded-xl"
        >
          For what reason are you feeling
          <span class="text-[#80beeb]">{{ mood.toLowerCase() }}</span> ?
        </p>
        <!-- 드롭박스 -->
        <div class="w-full pr-14 mt-7 relative">
          <div
            class="rounded-full border-[#3C36A7] border pl-[54px] pr-1 flex justify-between items-center w-full py-1"
            @click="openDropBox"
          >
            <p class="text-xl text-[#3C36A7] font-semibold">
              {{
                selectedOption === null
                  ? 'Select a reason! Tap here'
                  : selectedOption.value
              }}
            </p>
            <div
              class="w-[52px] h-[52px] bg-[#3C36A7] rounded-full flex justify-center items-center"
            >
              <img
                :src="
                  require(
                    `@/assets/img/${isOpened ? 'arrow_up' : 'arrow_down'}.svg`
                  )
                "
                alt="arrow"
              />
            </div>
          </div>
          <div class="absolute w-full h-[315px] pl-6 pr-[102px] z-50" v-if="isOpened">
            <div
              class="h-full w-full rounded-es-[15px] rounded-ee-[15px] bg-[#3C36A7]"
            >
              <div class="w-full h-full overflow-auto">
                <div class="w-full h-3"></div>
                <div
                  :class="`w-full px-7 text-xl font-medium text-left flex justify-between items-center ${selectedOption === item ? 'text-white' : 'text-[#A4A1DF]'}`"
                  v-for="item in items"
                  :key="`${item.value}dropdox`"
                  @click="() => selectOption(item)"
                >
                  <p class="py-2.5">
                    {{ item.value }}
                  </p>
                  <img
                    class="w-6"
                    :src="require(`@/assets/img/diary/step3/diary3_dropbox_check.svg`)"
                    alt="diary3_dropbox_check"
                    v-if="selectedOption === item"
                  />
                </div>
                <div class="w-full h-3"></div>
              </div>
            </div>
          </div>
        </div>
        <!-- 로봇 && 이미지 -->
        <div class="flex mt-6 w-full justify-center">
          <div class="w-[400px] h-[200px] relative rounded-[15px] bg-[#E9ECFC]">
            <div
              class="w-full h-full flex justify-center items-center text-[80px] font-medium text-white"
              v-if="selectedOption === null"
            >
              ?
            </div>
            <img
              class="w-full h-full rounded-[15px] object-cover"
              :src="require(`@/assets/img/diary/step3/reason_${selectedOption.key}.svg`)"
              alt="selected img"
              v-else
            />
            <MoodItem
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%]"
              :name="mood"
              :level="parseInt(level)"
              :text-content="MOODS_LEVEL[parseInt(level)]"
              isBorder="true"
              size="32"
              font-size="18"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="absolute bottom-0 h-[70px] w-full flex justify-between items-center"
    >
      <ButtonItems name="prev" @click="() => router.push({ name: 'diary2' })" />
      <Button
        class="px-8 py-4 rounded-full text-base font-medium text-white bg-[#8D36EF]"
        :class="saveButtonClass"
        @click="() => selectedOption !== null && openDiarySavePopup()"
      >
        save
      </Button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import router from '@/router';

import ButtonItems from '@/components/ButtonItems.vue';
import RobotItem from '@/components/RobotItem.vue';
import MoodItem from '@/components/MoodItem.vue';

import { usePopupStore } from '@/store/popupStore.js';
const popupStore = usePopupStore();

import { useDiaryStore } from '@/store/diaryStore.js';
import { MOODS_LEVEL } from '@/utils/constant';
const diaryStore = useDiaryStore();

const mood = computed(() => {
  // return props.selectedFeel || diaryStore.mood || 'sad';
  return diaryStore.mood || 'sad';
});
const level = computed(() => {
  return diaryStore.level;
});
const items = ref([
  { value: 'Related to something that happened in class', key: 1 },
  { value: 'Related to friends', key: 2 },
  { value: 'Related to family', key: 3 },
  { value: 'Related to school grade', key: 4 },
  { value: 'Related to abhout myself', key: 5 },
  { value: 'For other reasons not listed', key: 6 },
]);
const selectedOption = ref(null);
const isOpened = ref(false);

const saveButtonClass = computed(() => {
  let result = '';
  if (selectedOption.value === null) {
    result = 'bg-[#DADFF5]';
  }
  return result;
});

const openDropBox = () => {
  isOpened.value = !isOpened.value;
};

const selectOption = (item) => {
  selectedOption.value = item;
  diaryStore.setReason(item.value);
  openDropBox();
};

const openDiarySavePopup = () => {
  popupStore.openSaveDiaryPopup();
};
</script>

<style scoped></style>

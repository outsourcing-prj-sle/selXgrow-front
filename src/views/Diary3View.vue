<template>
  <div className="flex flex-col justify-between h-full relative">
    <div>
      <div className="flex items-start">
        <RobotItem />
        <p
          className="font-bold px-4 py-2 mt-4 rounded-md bg-white border-2 border-[#F6F0FF] text-left w-full"
        >
          Now, select the
          <span className="underline underline-offset-2">reason</span>
          you are feeling this way.
        </p>
      </div>
      <div className="flex flex-col px-24 justify-center items-center mt-4">
        <p
          className="text-white w-full bg-[#494857] py-4 break-all text-2xl rounded-xl"
        >
          For what reason are you feeling
          <span className="text-[#80beeb]">{{ 'sad' }}</span> ?
        </p>
        <!-- 드롭박스 -->
        <div class="w-full pr-14 mt-7">
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
          <div class="w-full h-[200px] pl-6 pr-[42px]" v-if="isOpened">
            <div
              class="h-full w-full rounded-es-[15px] rounded-ee-[15px] bg-[#3C36A7] overflow-hidden"
            >
              <div class="w-full h-full overflow-auto">
                <div class="w-full h-3"></div>
                <div
                  class="w-full px-7 text-[#A4A1DF] text-xl font-medium text-left flex justify-between items-center"
                  v-for="item in items"
                  :key="`${item.value}dropdox`"
                  @click="() => selectOption(item)"
                >
                  <p class="py-2.5">
                    {{ item.value }}
                  </p>
                  <img
                    class="w-6"
                    :src="require(`@/assets/img/diary3_dropbox_check.svg`)"
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
        <div class="flex mt-12 w-full justify-center">
          <div class="w-[390px] h-[190px] relative rounded-[15px] bg-[#E9ECFC]">
            <div
              class="w-full h-full flex justify-center items-center text-[80px] font-medium text-white"
              v-if="selectedOption === null"
            >
              ?
            </div>
            <img
              class="w-full h-full rounded-[15px] object-cover"
              :src="require(`@/assets/img/diary3_test.svg`)"
              alt="selected img"
              v-else
            />
            <img
              class="absolute -left-[50px] top-[45px] w-[100px]"
              :src="require(`@/assets/img/diary1-sad-icon.svg`)"
              alt="mood icon"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      className="absolute bottom-0 h-[70px] w-full flex justify-between items-center"
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

import { usePopupStore } from '@/store/popupStore.js';
const popupStore = usePopupStore();

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
  openDropBox();
};

const openDiarySavePopup = () => {
  // popupStore.openSaveDiaryPopup();
  popupStore.openCommonPopup();
};
</script>

<style scoped></style>

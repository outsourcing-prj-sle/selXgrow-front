<template>
  <div class="flex items-start">
    <RobotItem />
    <p
      class="font-extrabold px-4 py-2 mt-4 rounded-md bg-white border-2 border-[#F6F0FF] text-left w-full"
    >
      You can see your emotional timeline.
    </p>
  </div>
  <div class="flex h-full w-full sel-diary relative">
    <div class="mx-8 w-[65%] flex flex-col h-full gap-2">
      <p class="ml-20 text-2xl text-left font-bold">SEL Diary</p>
      <div
        class="bg-white rounded-2xl border-[#E9EBEC] border w-full flex-1 max-h-[420px] overflow-y-scroll relative"
      >
        <DiaryContents
          v-if="isSelected"
          :name="currentDiaryContents.mood"
          :date="currentDiaryContents.formattedDate"
          :highlight-content="`${currentDiaryContents.levelName} ${currentDiaryContents.mood}`"
          :reason="currentDiaryContents.reason"
          :color="currentDiaryContents.color"
        />
        <DiaryContents
          v-else
          v-for="(diaryContent, index) in currentDiaryContents"
          :key="index"
          :name="diaryContent.mood"
          :date="diaryContent.formattedDate"
          :highlight-content="`${diaryContent.levelName} ${diaryContent.mood}`"
          :reason="diaryContent.reason"
          :color="diaryContent.color"
        />
      </div>
    </div>
    <div class="flex-1 mt-8">
          <CalendarItem @onDateClick="handleDateClick" />
    </div>
  </div>
</template>

<script setup>
import CalendarItem from '@/components/CalendarItem.vue';
import DiaryContents from '@/components/DiaryContents.vue';
import RobotItem from '@/components/RobotItem.vue';

import { useDiaryStore } from '@/store/diaryStore.js';
import { computed, ref } from 'vue';

const diaryStore = useDiaryStore();

const isSelected = ref(false);
const selectedDiaryNo = ref(0);

const currentDiaryContents = computed(() => {
  if(isSelected.value) return diaryStore.diaryContents[selectedDiaryNo.value];
  else return diaryStore.diaryContents;
});

const handleDateClick = (data) => {
  selectedDiaryNo.value = diaryStore.diaryContents.findIndex((diaryContent) => {
    const [month, date] = diaryContent.date.split("/");

    return date === data.date && month === data.month;
  });

  if (selectedDiaryNo.value !== -1) isSelected.value = true;
  else isSelected.value = false;
}
</script>

<style scoped>
.sel-diary::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  background: url('@/assets/img/pencil.svg') no-repeat;
  width: 100px;
  height: 100px;
}
</style>

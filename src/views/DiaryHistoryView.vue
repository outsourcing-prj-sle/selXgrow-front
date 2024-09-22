<template>
  <div className="flex items-start">
    <RobotItem />
    <p
      className="font-extrabold px-4 py-2 mt-4 rounded-md bg-white border-2 border-[#F6F0FF] text-left w-full"
    >
      You can see your emotional timeline.
    </p>
  </div>
  <div className="flex h-full w-full sel-diary relative">
    <div className="mx-8 w-[65%] flex flex-col h-full gap-2">
      <p className="ml-20 text-2xl text-left font-bold">SEL Diary</p>
      <div
        className="bg-white rounded-2xl border-[#E9EBEC] border w-full flex-1 max-h-[calc(100%-70px)] overflow-y-scroll relative"
      >
        <DiaryContents
          v-for="d in data"
          :key="d"
          :name="MOODS[d.name].name"
          date="September 5, 2024 1:30pm"
          :highlight-content="`${MOODS_LEVEL[d.level].toLowerCase()} ${MOODS[d.name].name}`"
          :color="MOODS[d.name].highlightColor"
        />
      </div>
    </div>
    <div className="flex-1 mt-8">
      <CalendarItem />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import CalendarItem from '@/components/CalendarItem.vue';
import DiaryContents from '@/components/DiaryContents.vue';
import RobotItem from '@/components/RobotItem.vue';
import { MOODS, MOODS_LEVEL } from '@/utils/constant';

const data = [
  {
    name: 'Happy',
    level: 3,
  },
  {
    name: 'Sad',
    level: 1,
  },
  {
    name: 'Sad',
    level: 1,
  },
];

import { useDiaryStore } from '@/store/diaryStore.js';
const diaryStore = useDiaryStore();

// 색상 코드 ex) #ffffff
const color = computed(() => {
  return diaryStore.color;
});
// 아이콘 이름 ex) diary1-sad-small
const icon = computed(() => {
  return diaryStore.icon;
});
// 기분 ex) sad
const mood = computed(() => {
  return diaryStore.mood;
});
// 선택한 렙 ex) 1
const level = computed(() => {
  return diaryStore.level;
});
// 선택한 기분 단계 ex) very
const levelName = computed(() => {
  return diaryStore.levelName;
});
// 선택한 기분 이유 ex) Related to friends
const reason = computed(() => {
  return diaryStore.reason;
});
</script>

<style scoped>
.sel-diary::after {
  content: '';
  position: absolute;
  bottom: 30px;
  left: -10px;
  background: url('@/assets/img/pencil.svg') no-repeat;
  width: 100px;
  height: 100px;
}
</style>

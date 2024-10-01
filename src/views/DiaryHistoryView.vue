<template>
  <div class="flex items-start">
    <RobotItem />
    <p
      class="font-extrabold px-4 py-2 mt-4 rounded-md bg-white border-2 border-[#F6F0FF] text-left w-full"
    >
      Here is your emotion timeline.
    </p>
  </div>
  <div class="flex w-full sel-diary relative">
    <div class="mx-8 w-[65%] flex flex-col h-full gap-2 relative">
      <p class="ml-20 text-2xl text-left font-bold">SEL Diary</p>
      <div
        class="bg-white rounded-2xl border-[#E9EBEC] border w-full flex-1 min-h-[400px] max-h-[400px] overflow-y-scroll relative beforeLine"
        ref="diaryContainer"
        :style="beforeLineHeight"
      >
        <DiaryContents
          v-for="(diaryContent, index) in currentDiaryContents"
          :key="index"
          :name="diaryContent.mood"
          :level="diaryContent.level"
          :date="diaryContent.formattedDate"
          :highlight-content="`${diaryContent.levelName} ${diaryContent.mood}`"
          :reason="diaryContent.reason"
          :color="diaryContent.color"
          :highlight-color="diaryContent.highlightColor"
          :index="index"
        />
      </div>
    </div>
    <div class="flex-1 mt-8">
      <CalendarItem
        @onDateClick="handleDateClick"
        @onMonthChange="handleMonthChange"
      />
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

const diaryContainer = ref(null);
const currentMonth = ref(diaryStore.date.split('/')[0]);

const currentDiaryContents = computed(() => {
  console.log(`diaryContents: ${JSON.stringify(diaryStore.diaryContents)}`);

  const filteredDiaryContents = diaryStore.diaryContents.filter(
    (diaryContent) => {
      if (diaryContent.date.split('/')[0] === currentMonth.value)
        return diaryContent;
    }
  );

  return filteredDiaryContents.sort((content1, content2) => {
    return (
      parseInt(content2.date.split('/')[1]) -
      parseInt(content1.date.split('/')[1])
    );
  });
});

const scrollToDiaryContent = (index) => {
  const target = diaryContainer.value.querySelector(`[data-index="${index}"]`);

  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const handleDateClick = (data) => {
  const index = currentDiaryContents.value.findIndex((diaryContent) => {
    const [month, date] = diaryContent.date.split('/');

    return date === data.date && month === data.month;
  });
  scrollToDiaryContent(index);
};

const handleMonthChange = (month) => {
  currentMonth.value = month;
};

const beforeLineHeight = computed(() => {
  const calcHeight = 130 * currentDiaryContents.value.length;

  if (calcHeight > 420) {
    return {
      '--before-line-height': `${130 * currentDiaryContents.value.length}px`,
    };
  } else {
    return {
      '--before-line-height': `100%`,
    };
  }
});
</script>

<style scoped>
.sel-diary::after {
  content: '';
  position: absolute;
  bottom: -35px;
  left: -7px;
  background: url('@/assets/img/pencil.svg') no-repeat;
  width: 100px;
  height: 100px;
}

.beforeLine::after {
  position: absolute;
  top: 0;
  left: 110px;
  right: 5px;
  bottom: 0;
  background-image: linear-gradient(transparent 90%, #efefef 95%);
  background-size: 100% 2em;
  background-repeat: repeat-y;
  content: '';
  height: var(--before-line-height);
}
</style>

<template>
  <div class="flex flex-col justify-between h-full relative">
    <div>
      <div class="flex items-start">
        <RobotItem />
        <div class="w-full flex-col">
          <p class="text-left text-[#555195] font-semibold">Hello, Jessika!</p>
          <div
            class="px-4 py-2 rounded-md bg-white border-2 border-[#F6F0FF] text-left w-2/3 flex-col"
          >
            <p class="font-semibold">
              Nice to meet you! I'd like to get to know you better!
            </p>
            <p class="font-semibold">I have four activities for you to try.</p>
            <p class="font-extrabold mt-4">
              Click the "Start" button to begin the activity!
            </p>
          </div>
        </div>
      </div>
      <div class="flex justify-between items-end mt-4 px-8">
        <ActivityCard
          v-for="state in progressStates"
          :key="state.step"
          :step="state.step"
          :active="state.active"
        />
      </div>
    </div>
    <div
      class="absolute bottom-0 h-[70px] w-full flex justify-between items-center"
    >
      <ButtonItems name="start" @click="handleClickStart" />
    </div>
  </div>
</template>

<script setup>
import router from '@/router';

import ButtonItems from '@/components/ButtonItems.vue';
import RobotItem from '@/components/RobotItem.vue';
import ActivityCard from '@/components/ActivityCard.vue';

const progressStates = [
  {
    step: 1,
    active: true,
  },
  {
    step: 2,
    active: false,
  },
  {
    step: 3,
    active: false,
  },
  {
    step: 4,
    active: false,
  },
];

const handleClickStart = () => {
  const index = progressStates.findIndex((state) => state.active === false);

  // router.push({ name: 'checkInNotice', params: { type: index } });

  router.push({ name: 'checkInReport', params: { type: index } });
};
</script>

<style scoped></style>

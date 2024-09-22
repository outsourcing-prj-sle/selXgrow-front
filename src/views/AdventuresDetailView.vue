<template>
  <div className="flex flex-col justify-between h-full relative">
    <div>
      <div className="flex items-start">
        <RobotItem />
        <p className="font-bold px-4 py-2 mt-4 rounded-md bg-white border-2 border-[#F6F0FF] text-left w-full">
          Let’s go on an adventure! Here are some recommended videos for you.
        </p>
      </div>
      <div className="flex flex-col px-36 justify-center items-center relative">
        <div className="bg-gray-300 rounded-2xl w-full h-72"></div>
        <div className="flex flex-col items-start w-full pt-4">
          <p className="font-extrabold text-lg">Video name</p>
          <div className="flex justify-between items-center w-full">
            <b>This is the area where there is a description of the video above.</b>
            <p className="text-[#6FB3F2]">08.27.2024</p>
          </div>
          <b className="pt-2 text-[#8D36EF]">SEL Admin</b>
        </div>
      </div>
    </div>
    <div className="absolute bottom-0 h-[70px] w-full flex justify-between items-center">
      <ButtonItems name="prev" @click="() => router.push({ name: 'adventures' })" />
    </div>
  </div>
</template>

<script setup>
import router from '@/router';
import { useRoute } from 'vue-router';

import RobotItem from '@/components/RobotItem.vue';
import ButtonItems from '@/components/ButtonItems.vue';

const route = useRoute();
</script>

<style scoped></style>

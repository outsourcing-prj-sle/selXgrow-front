<template>
  <div class="flex flex-col h-full relative">
    <div class="flex flex-col flex-1">
      <div class="flex items-start">
        <RobotItem />
        <p
          class="font-bold px-4 py-2 mt-4 rounded-md bg-white border-2 border-[#F6F0FF] text-left w-full"
        >
          Let’s go on an adventure! Here are some recommended videos for you.
        </p>
      </div>
      <div class="flex flex-col items-center justify-between flex-1">
        <!-- 영상 목록 -->
        <div class="flex justify-center">
          <div
            class="flex gap-4 flex-wrap justify-start max-w-[750px] ml-[100px]"
          >
            <div
              class="flex flex-col text-[#19146A] text-left"
              v-for="n in 6"
              :key="n"
              @click="() => goDetail({ id: n, header: headerList[n-1], content: contentList[n-1] })"
            >
              <img
                class="w-[226px] h-[140px] object-cover rounded-xl border-4 border-[#deefff]"
                :src="require(`@/assets/img/adventure_thumbnail_${n}.svg`)"
                alt="adventure_thumbnail"
              />
              <p class="font-bold text-sm mt-2">{{ headerList[n - 1] }}</p>
              <p class="text-xs font-medium max-w-[200px]">
                {{ contentList[n - 1] }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router';
import RobotItem from '@/components/RobotItem.vue';
import { VIDEOS } from '@/utils/constant';

const goDetail = ({ id, header, content }) => {
  if(id > VIDEOS.length) alert('준비 중입니다.')
  else router.push({ name: 'adventuresDetail', params: { id }, query: { header, content } });
};

const headerList = [
  'Feeling Flowers',
  'Mindfulness calming jar',
  'Mindfulness my magic breath',
  'Emotions are part of who i am',
  'Mindfulness practice',
  'Comparing Facial Expressions',
];

const contentList = [
  'running time 9:35',
  'running time 4:06',
  'running time 3:08',
  'running time 5:23',
  'running time 13:54',
  'running time: 12:10',
];
</script>

<style scoped></style>

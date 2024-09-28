<template>
  <div class="flex flex-col justify-between h-full relative">
    <div>
      <div class="flex items-start">
        <RobotItem />
        <p class="font-bold px-4 py-2 mt-4 rounded-md bg-white border-2 border-[#F6F0FF] text-left w-full">
          Let’s go on an adventure! Here are some recommended videos for you.
        </p>
      </div>
      <div class="flex flex-col px-36 justify-center items-center relative">
        <VideoPlayer 
          class="h-72 w-full" 
          controls 
          :src="`/grow/resources/video/${video}.mp4`"
        />
        <div class="flex flex-col items-start w-full pt-4">
          <p class="font-extrabold text-lg">{{  route.query.header  }}</p>
          <div class="flex justify-between items-center w-full">
            <p class="semibold">{{ route.query.content }}</p>
            <p class="text-[#6FB3F2] font-semibold">08.27.2024</p>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute bottom-0 h-[70px] w-full flex justify-between items-center">
      <ButtonItems name="prev" @click="() => router.push({ name: 'adventures' })" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import { VideoPlayer } from '@videojs-player/vue';
import 'video.js/dist/video-js.css'
import { VIDEOS } from '@/utils/constant'

import RobotItem from '@/components/RobotItem.vue';
import ButtonItems from '@/components/ButtonItems.vue';

const route = useRoute();

const video = computed(() => {
  const id = route.params.id
  return VIDEOS[id - 1]
})
</script>

<style>
.video-js .vjs-control-bar {
  background-color: rgba(25, 20, 106, 0.6);
}
.video-js .vjs-big-play-button {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

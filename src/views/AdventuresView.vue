<template>
  <div class="flex flex-col h-full relative">
    <div class="flex flex-col flex-1">
      <div className="flex items-start">
        <RobotItem />
        <p
          className="font-bold px-4 py-2 mt-4 rounded-md bg-white border-2 border-[#F6F0FF] text-left w-full"
        >
          Let’s go on an adventure! Here are some recommended videos for you.
        </p>
      </div>
      <!-- 영상 목록 -->
      <div class="flex justify-center">
        <div
          class="flex gap-4 flex-wrap justify-start max-w-[750px] ml-[100px]"
        >
          <div
            class="flex flex-col text-[#19146A] text-left"
            v-for="n in 5"
            :key="n"
            @click="() => goDetail()"
          >
            <img
              class="w-[226px] h-[130px] object-cover"
              :src="require(`@/assets/img/adventure_thumbnail.svg`)"
              alt="adventure_thumbnail"
            />
            <p class="font-semibold text-sm mt-3">Video name</p>
            <p class="text-xs font-medium max-w-[200px]">
              This is the area where there is a description of the video above.
            </p>
          </div>
        </div>
      </div>
      <!-- 페이징 -->
      <div className="h-[70px] w-full flex justify-center gap-10 items-center">
        <ButtonItems
          name="prev"
          @click="() => router.push({ name: 'diary1' })"
        />
        <div class="flex text-[#B1B0C5] text-sm font-medium">
          <div class="p-0.5 text-[#8D36EF] font-semibold">1</div>
          <div class="p-0.5">2</div>
          <div class="p-0.5">3</div>
          <div class="p-0.5">4</div>
        </div>
        <ButtonItems
          name="next"
          @click="() => router.push({ name: 'diary3' })"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import router from '@/router';
import RobotItem from '@/components/RobotItem.vue';
import ButtonItems from '@/components/ButtonItems.vue';

const goDetail = () => {
  router.push({ name: 'adventuresdetail' });
};
</script>

<style scoped></style>

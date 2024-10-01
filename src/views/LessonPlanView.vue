<template>
  <div class="flex flex-col h-full relative">
    <div class="flex flex-col flex-1">
      <div class="flex items-start">
        <RobotItem />
        <p
          class="font-bold px-4 py-2 mt-4 rounded-md bg-white border-2 border-[#F6F0FF] text-left w-full"
        >
          Click on each lesson plan for more detail.
        </p>
      </div>
      <div class="flex flex-col justify-between items-center flex-1">
        <!-- 영상 목록 -->
        <div class="flex justify-center">
          <div
            class="flex gap-x-8 gap-y-16 flex-wrap justify-start max-w-[750px] ml-[100px]"
          >
            <div
              class="flex cursor-pointer flex-col w-[228px] h-[180px] relative items-start gap-y-3"
              v-for="n in 6"
              :key="n"
              @click="() => openPDFPopup(n)"
            >
              <img
                class="w-full h-full object-cover rounded-xl border-2 border-[#e1e1e1]"
                :src="require(`@/assets/img/lesson/lesson_thumbnail_${n}.svg`)"
                :alt="`lesson_thumbnail_${n}`"
              />
              <p
                class="text-base font-extrabold text-left leading-none pl-2 break-keep"
                v-html="textList[n - 1]"
              ></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import RobotItem from '@/components/RobotItem.vue';
import { usePopupStore } from '@/store/popupStore';

const popupStore = usePopupStore();

const textList = ref([
  'STORY TIME',
  'MYSTERY MAIL',
  'CREATE A GARDEN<br/>OF FEELING FLOWERS',
  'PARCTICE RAINBOW BREATHING',
  'PINWHEELS1',
  'PINWHEELS 2',
]);

const openPDFPopup = (id) => {
  popupStore.commonPopupId = id;
  popupStore.openCommonPopup(id);
};
</script>

<style scoped></style>

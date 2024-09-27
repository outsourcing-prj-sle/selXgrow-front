<template>
  <div class="flex flex-col h-full relative">
    <div class="flex flex-col flex-1">
      <div class="flex items-start">
        <RobotItem />
        <p
          class="font-bold px-4 py-2 mt-4 rounded-md bg-white border-2 border-[#F6F0FF] text-left w-full"
        >
          The lesson plan is provided in detail on the site.
        </p>
      </div>
      <div class="flex flex-col justify-between items-center flex-1">
        <!-- 영상 목록 -->
        <div class="flex justify-center">
          <div
            class="flex gap-x-4 gap-y-14 flex-wrap justify-start max-w-[750px] ml-[100px]"
          >
            <div
              class="flex flex-col w-[232px] h-[140px] relative items-start gap-y-2"
              v-for="n in 6"
              :key="n"
              @click="() => openPDFPopup(n)"
            >
              <img
                class="w-full h-full object-cover rounded-xl"
                :src="require(`@/assets/img/lesson_thumbnail_${n}.svg`)"
                :alt="`lesson_thumbnail_${n}`"
              />
              <p class="text-base font-extrabold text-left leading-none pl-2 break-keep">
                {{ textList[n - 1] }}
              </p>
            </div>
          </div>
        </div>
        <!-- 페이징 -->
        <div
          class="h-[70px] w-full flex justify-center gap-10 items-center mt-12"
        >
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
  </div>
</template>

<script setup>
import { ref } from 'vue';
import router from '@/router';
import RobotItem from '@/components/RobotItem.vue';
import ButtonItems from '@/components/ButtonItems.vue';
import { usePopupStore } from '@/store/popupStore';

const popupStore = usePopupStore();

const textList = ref([
  'STORY TIME',
  'MYSTERY MAIL',
  'CREATE A GARDEN OF FEELING FLOWERS',
  'PARCTICE RAINBOW BREATHING',
  'CREATE PINWHEELS1',
  'PINWHEELS 2',
]);

const openPDFPopup = (id) => {
  popupStore.commonPopupId = id;
  popupStore.openCommonPopup(id);
};
</script>

<style scoped></style>

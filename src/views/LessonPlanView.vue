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
      <!-- 영상 목록 -->
      <div class="flex justify-center">
        <div
          class="flex gap-x-4 gap-y-8 flex-wrap justify-start max-w-[750px] ml-[100px]"
        >
          <div
            class="flex flex-col w-[232px] h-[161px] relative rounded-xl overflow-hidden"
            v-for="n in 6"
            :key="n"
            @click="() => openPDFPopup()"
          >
            <img
              class="w-full h-full object-cover"
              :src="require(`@/assets/img/lesson_thumbnail_${n}.svg`)"
              :alt="`lesson_thumbnail_${n}`"
            />
            <div
              class="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center"
            >
              <div class="text-white underline text-base font-semibold">
                {{ textList[n - 1] }}
              </div>
            </div>
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
</template>

<script setup>
import { ref } from 'vue';
import router from '@/router';
import RobotItem from '@/components/RobotItem.vue';
import ButtonItems from '@/components/ButtonItems.vue';
import { usePopupStore } from '@/store/popupStore';

const popupStore = usePopupStore();

const textList = ref([
  'MYSTERY MAIL',
  'CREATE A GARGEN OF FEELING FLOWERS',
  'MYSTERY MAIL',
  'MYSTERY MAIL',
  'CREATE A GARGEN OF FEELING FLOWERS',
  'MYSTERY MAIL',
]);

const openPDFPopup = () => {
  popupStore.openCommonPopup();
};
</script>

<style scoped></style>

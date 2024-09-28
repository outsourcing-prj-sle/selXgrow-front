<template>
  <div class="flex w-full mt-10 justify-end">
    <div
      class="font-bold text-sm text-[#555195] max-w-[180px] text-left pt-[75px]"
    >
      [Example]<br /><br />

      Here’s an example. I’ll show you how you can build a facial expression
      using one set of eyes, and one set of nose and mouth.
    </div>
    <div class="flex flex-col w-[650px] mr-5 ml-4">
      <div class="w-full rounded-xl mt-2 overflow-hidden">
        <div class="flex max-md:flex-col max-md:gap-0">
          <div class="flex flex-col max-md:ml-0 max-md:w-full justify-center">
            <FaceImg
              class="w-[233px] h-[223px]"
              :eyes="eyesIndex && eyes[eyesIndex - 1]"
              :mouth="mouthIndex && mouth[mouthIndex - 1]"
            />
          </div>
          <div class="flex ml-2 w-[56%] max-md:ml-0 max-md:w-full">
            <FaceSelectList
              :title="'Eye'"
              :itemList="eyes"
              :selected="eyesIndex"
              @selectItem="(index) => selectIndex(index, 'eyes')"
            />
            <div class="mx-2 h-full"></div>
            <FaceSelectList
              :title="'Nose & Mouth'"
              :itemList="mouth"
              :selected="mouthIndex"
              @selectItem="(index) => selectIndex(index, 'mouth')"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import FaceImg from '@/components/FaceImg.vue';
import FaceSelectList from '@/components/FaceSelectList.vue';

const emit = defineEmits(['allowNext']);
const eyes = ref([
  'report6_notice_eye_1',
  'report6_notice_eye_2',
  'report6_notice_eye_3',
  'report6_notice_eye_4',
  'report6_notice_eye_5',
  'report6_notice_eye_6',
]);
const mouth = ref([
  'report6_notice_mouth_1',
  'report6_notice_mouth_2',
  'report6_notice_mouth_3',
  'report6_notice_mouth_4',
  'report6_notice_mouth_5',
  'report6_notice_mouth_6',
]);
const eyesIndex = ref(null);
const mouthIndex = ref(null);

watch([eyesIndex, mouthIndex], () => {
  if (eyesIndex.value && mouthIndex.value) {
    emit('allowNext', true);
  }
});

const selectIndex = (index, title) => {
  if (title === 'eyes') {
    eyesIndex.value = index;
  } else {
    mouthIndex.value = index;
  }
};
</script>

<style scoped></style>

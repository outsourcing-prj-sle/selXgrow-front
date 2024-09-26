<template>
  <div class="flex w-full mt-10 justify-end">
    <div class="pt-3 font-bold text-sm text-[#555195]">
      [Example]<br /><br />

      Here’s an example. I’ll show you how you can build a facial expression
      using one set of eyes, and one set of nose and mouth.
    </div>
    <div class="flex flex-col w-[650px] mr-5 ml-4">
      <div class="w-full bg-[#D4EAFF] rounded-xl mt-2 overflow-hidden">
        <div class="flex gap-5 max-md:flex-col max-md:gap-0">
          <div class="flex flex-col w-[44%] max-md:ml-0 max-md:w-full">
            <FaceImg
              :eyes="eyesIndex >= 0 && eyes[eyesIndex - 1]"
              :mouth="mouthIndex >= 0 && mouth[mouthIndex - 1]"
            />
            <!-- todo :: FaceImg eye, mouth잘넘기기 -->
          </div>
          <div class="flex ml-5 w-[56%] max-md:ml-0 max-md:w-full">
            <!-- todo :: FaceSelectList에 리스트 넘기기, 근대 리스트 말고 그냥 경로 중간 문자열만 줘도 될지도? selected도 잘 넣기 -->
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
const selectedOption = ref(null);
const emit = defineEmits(['allowNext']);

watch(selectedOption, () => {
  emit('allowNext', true);
});
</script>

<style scoped></style>

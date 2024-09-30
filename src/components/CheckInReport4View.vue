<template>
  <div class="flex ml-[193px] mt-[60px]">
    <div class="flex flex-1">
      <div
        class="border border-[#F5F5F5] rounded-xl w-[236px] h-[303px] overflow-hidden"
      >
        <img
          :src="require(`@/assets/img/report/report4_${flag}.svg`)"
          class="w-full h-full"
          alt="report4_img"
        />
      </div>
      <div
        class="flex gap-x-10 gap-y-11 pt-7 w-[280px] flex-wrap h-fit ml-10"
        v-if="show"
      >
        <div
          class="w-[120px] py-3 font-semibold text-base border border-[#D8ECFF] rounded-full"
          :class="{
            ' bg-white text-[#606060]': selectedOption !== 1,
            ' bg-[#8F61EC] text-white': selectedOption === 1,
          }"
          @click="() => setSelectOption(1)"
        >
          happy
        </div>
        <div
          class="w-[120px] py-3 font-semibold text-base border border-[#D8ECFF] rounded-full"
          :class="{
            ' bg-white text-[#606060]': selectedOption !== 2,
            ' bg-[#8F61EC] text-white': selectedOption === 2,
          }"
          @click="() => setSelectOption(2)"
        >
          sad
        </div>
        <div
          class="w-[120px] py-3 font-semibold text-base border border-[#D8ECFF] rounded-full"
          :class="{
            ' bg-white text-[#606060]': selectedOption !== 3,
            ' bg-[#8F61EC] text-white': selectedOption === 3,
          }"
          @click="() => setSelectOption(3)"
        >
          angry
        </div>
        <div
          class="w-[120px] py-3 font-semibold text-base border border-[#D8ECFF] rounded-full"
          :class="{
            ' bg-white text-[#606060]': selectedOption !== 4,
            ' bg-[#8F61EC] text-white': selectedOption === 4,
          }"
          @click="() => setSelectOption(4)"
        >
          surprise
        </div>
        <div
          class="w-[120px] py-3 font-semibold text-base border border-[#D8ECFF] rounded-full"
          :class="{
            ' bg-white text-[#606060]': selectedOption !== 5,
            ' bg-[#8F61EC] text-white': selectedOption === 5,
          }"
          @click="() => setSelectOption(5)"
        >
          fear
        </div>
        <div
          class="w-[120px] py-3 font-semibold text-base border border-[#D8ECFF] rounded-full"
          :class="{
            ' bg-white text-[#606060]': selectedOption !== 6,
            ' bg-[#8F61EC] text-white': selectedOption === 6,
          }"
          @click="() => setSelectOption(6)"
        >
          disgust
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const selectedOption = ref(null);
const emit = defineEmits(['allowNext']);

const props = defineProps({
  flag: {
    type: String,
    default: 'empty',
  },
  show: {
    type: Boolean,
    default: false,
  },
});

watch(selectedOption, () => {
  emit('allowNext', true);
});

const setSelectOption = (v) => {
  selectedOption.value = v;
};
</script>

<style scoped></style>

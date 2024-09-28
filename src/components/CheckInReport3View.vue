<template>
  <div class="flex mt-5 ml-[193px]">
    <div class="flex flex-col flex-1">
      <div
        class="flex mt-4 py-[70px] justify-center items-center bg-[#F6FBFF] relative rounded-xl text-base font-semibold text-[#606060]"
      >
        <img
          src="@/assets/img/report/report3_1.svg"
          alt="Eyes"
          class="object-cover rounded-lg w-[298px] h-[120px]"
        />
        <button
          class="absolute w-[120px] top-[40px] left-[34px] transform -translate-y-1/2 rounded-full py-3 shadow"
          :class="selectedOption === 1 ? 'bg-[#8F61EC] text-white' : 'bg-white'"
          @click="() => setSelectOption(1)"
        >
          Sad
        </button>
        <button
          class="absolute w-[120px] top-[40px] right-[34px] transform -translate-y-1/2 rounded-full py-3 shadow"
          :class="selectedOption === 2 ? 'bg-[#8F61EC] text-white' : 'bg-white'"
          @click="() => setSelectOption(2)"
        >
          Happy
        </button>
        <button
          class="absolute w-[120px] bottom-0 left-[34px] transform -translate-y-1/2 rounded-full py-3 shadow"
          :class="selectedOption === 3 ? 'bg-[#8F61EC] text-white' : 'bg-white'"
          @click="() => setSelectOption(3)"
        >
          Scared
        </button>
        <button
          class="absolute w-[120px] bottom-0 right-[34px] transform -translate-y-1/2 rounded-full py-3 shadow"
          :class="selectedOption === 4 ? 'bg-[#8F61EC] text-white' : 'bg-white'"
          @click="() => setSelectOption(4)"
        >
          Angry
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const selectedOption = ref(null);
const emit = defineEmits(['allowNext']);

watch(selectedOption, () => {
  emit('allowNext', true);
});

const setSelectOption = (v) => {
  selectedOption.value = v;
};
</script>

<style scoped></style>

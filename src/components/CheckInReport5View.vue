<template>
  <div class="flex mt-1 justify-center">
    <div class="flex flex-col items-center w-[720px]">
      <div
        class="flex flex-col px-9 text-base leading-8 max-md:px-5 max-md:max-w-full"
      >
        <img
          :src="require(`@/assets/img/report/report5_q5.png`)"
          alt="5q1"
          class="self-center max-w-full max-h-[200px]"
        />
      </div>
      <div
        class="flex gap-5 px-9 justify-between self-center w-full text-xl leading-8 whitespace-nowrap max-md:flex-wrap max-md:max-w-full"
        :class="{
          'pointer-events-none': status === 'done',
        }"
      >
        <label
          for="option1"
          class="shrink-0 self-stretch flex-1 flex flex-col justify-start items-center relative cursor-pointer"
        >
          <input
            class="hidden"
            type="radio"
            name="activityQuestion"
            id="option1"
            :value="parseInt(1)"
            v-model="selectedOption"
          />
          <div
            class="absolute top-[20px] left-0 flex justify-center items-center px-1 text-lg font-semibold leading-8 whitespace-nowrap rounded-full border border-solid border-[#A9B7C5] h-[38px] stroke-[1px] w-[38px]"
            :class="
              selectedOption === 1
                ? 'text-[#D3F571] bg-[#8D36EF]'
                : 'text-[#A9B7C5] bg-white'
            "
          >
            1
          </div>
          <img
            :src="require(`@/assets/img/report/report5_a51.svg`)"
            alt="5a1"
            class="self-center object-contain max-w-full h-[224px]"
          />

          <span
            class="text-sm font-medium bottom-[10px] absolute left-1/2 transform -translate-x-1/2"
            :class="selectedOption === 1 ? 'text-[#8D36EF]' : 'text-[#C0C6E9]'"
          >
            Joy
          </span>
        </label>
        <label
          for="option2"
          class="shrink-0 self-stretch flex-1 flex flex-col justify-start items-center relative cursor-pointer"
        >
          <input
            class="hidden"
            type="radio"
            name="activityQuestion"
            id="option2"
            :value="parseInt(2)"
            v-model="selectedOption"
          />
          <div
            class="absolute top-[20px] left-0 flex justify-center items-center px-1 text-lg font-semibold leading-8 whitespace-nowrap rounded-full border border-solid border-[#A9B7C5] h-[38px] stroke-[1px] w-[38px]"
            :class="
              selectedOption === 2
                ? 'text-[#D3F571] bg-[#8D36EF]'
                : 'text-[#A9B7C5] bg-white'
            "
          >
            2
          </div>
          <img
            :src="require(`@/assets/img/report/report5_a52.svg`)"
            alt="5a2"
            class="self-center object-contain max-w-full h-[224px]"
          />

          <span
            class="text-sm font-medium bottom-[10px] absolute left-1/2 transform -translate-x-1/2"
            :class="selectedOption === 2 ? 'text-[#8D36EF]' : 'text-[#C0C6E9]'"
          >
            Upset
          </span>
        </label>
        <label
          for="option3"
          class="shrink-0 self-stretch flex-1 flex flex-col justify-start items-center relative cursor-pointer"
        >
          <input
            class="hidden"
            type="radio"
            name="activityQuestion"
            id="option3"
            :value="parseInt(3)"
            v-model="selectedOption"
          />
          <div
            class="absolute top-[20px] left-0 flex justify-center items-center px-1 text-lg font-semibold leading-8 whitespace-nowrap rounded-full border border-solid border-[#A9B7C5] h-[38px] stroke-[1px] w-[38px]"
            :class="
              selectedOption === 3
                ? 'text-[#D3F571] bg-[#8D36EF]'
                : 'text-[#A9B7C5] bg-white'
            "
          >
            3
          </div>
          <img
            :src="require(`@/assets/img/report/report5_a53.svg`)"
            alt="5a3"
            class="self-center object-contain max-w-full h-[224px]"
          />

          <span
            class="text-sm font-medium bottom-[10px] absolute left-1/2 transform -translate-x-1/2"
            :class="selectedOption === 3 ? 'text-[#8D36EF]' : 'text-[#C0C6E9]'"
          >
            Anger
          </span>
        </label>
        <label
          for="option4"
          class="shrink-0 self-stretch flex-1 flex flex-col justify-start items-center relative cursor-pointer"
        >
          <input
            class="hidden"
            type="radio"
            name="activityQuestion"
            id="option4"
            :value="parseInt(4)"
            v-model="selectedOption"
          />
          <div
            class="absolute top-[20px] left-0 flex justify-center items-center px-1 text-lg font-semibold leading-8 whitespace-nowrap rounded-full border border-solid border-[#A9B7C5] h-[38px] stroke-[1px] w-[38px]"
            :class="
              selectedOption === 4
                ? 'text-[#D3F571] bg-[#8D36EF]'
                : 'text-[#A9B7C5] bg-white'
            "
          >
            4
          </div>
          <img
            :src="require(`@/assets/img/report/report5_a54.svg`)"
            alt="5a4"
            class="self-center object-contain max-w-full h-[224px]"
          />

          <span
            class="text-sm font-medium bottom-[10px] absolute left-1/2 transform -translate-x-1/2"
            :class="selectedOption === 4 ? 'text-[#8D36EF]' : 'text-[#C0C6E9]'"
          >
            Alright(Okay)
          </span>
        </label>
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

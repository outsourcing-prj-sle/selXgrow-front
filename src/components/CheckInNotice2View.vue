<template>
  <div class="flex w-full mt-5 justify-end">
    <div class="pt-3 font-bold text-sm text-[#555195]">(Example)</div>
    <div class="flex flex-col w-[650px] mr-5 ml-4">
      <div
        class="w-full rounded-xl bg-[#494857] py-3 px-4 text-base text-white font-normal text-left"
      >
        I like to swim in the pool.
      </div>
      <div class="w-full bg-[#D4EAFF] rounded-xl mt-2 overflow-hidden">
        <div class="grid grid-cols-4 text-center w-full py-8 px-6">
          <div
            class="flex flex-1 text-sm font-semibold text-blue-700 justify-center"
          >
            <span class="font-bold mr-1">01.</span>
            <span>Never</span>
          </div>
          <div
            class="flex text-sm font-semibold text-blue-700 flex-1 justify-center"
          >
            <span class="font-bold mr-1">02.</span>
            <span>Sometimes</span>
          </div>
          <div
            class="flex text-sm font-semibold text-blue-700 flex-1 justify-center"
          >
            <span class="font-bold mr-1">03.</span>
            <span>Often</span>
          </div>
          <div
            class="flex text-sm font-semibold text-blue-700 flex-1 justify-center"
          >
            <span class="font-bold mr-1">04.</span>
            <span>Almost Always</span>
          </div>
        </div>
        <div
          class="grid grid-cols-4 justify-between text-center w-full py-7 px-6 bg-[#F6FBFF]"
        >
          <div class="flex text-left justify-center items-center">
            <label>
              <input
                type="radio"
                name="options"
                :value="1"
                class="hidden peer"
                v-model="selectedOption"
              />
              <div
                class="w-10 h-10 rounded-full border-2 border-[#BECEDE] flex items-center justify-center cursor-pointer"
                :class="selectedOption === 1 && 'border-[#3C36A7] bg-[#3C36A7]'"
              >
                <img
                  v-if="selectedOption === 1"
                  :src="require(`@/assets/img/check.svg`)"
                  class="w-[15px]"
                  alt="check"
                />
              </div>
            </label>
          </div>

          <div class="flex text-left justify-center items-center">
            <label>
              <input
                type="radio"
                name="options"
                :value="2"
                class="hidden peer"
                v-model="selectedOption"
              />
              <div
                class="w-10 h-10 rounded-full border-2 border-[#BECEDE] flex items-center justify-center cursor-pointer"
                :class="selectedOption === 2 && 'border-[#3C36A7] bg-[#3C36A7]'"
              >
                <img
                  v-if="selectedOption === 2"
                  :src="require(`@/assets/img/check.svg`)"
                  class="w-[15px]"
                  alt="check"
                />
              </div>
            </label>
          </div>

          <div class="flex text-left justify-center items-center">
            <label>
              <input
                type="radio"
                name="options"
                :value="3"
                class="hidden peer"
                v-model="selectedOption"
              />
              <div
                class="w-10 h-10 rounded-full border-2 border-[#BECEDE] flex items-center justify-center cursor-pointer"
                :class="selectedOption === 3 && 'border-[#3C36A7] bg-[#3C36A7]'"
              >
                <img
                  v-if="selectedOption === 3"
                  :src="require(`@/assets/img/check.svg`)"
                  class="w-[15px]"
                  alt="check"
                />
              </div>
            </label>
          </div>

          <div class="flex text-left justify-center items-center">
            <label>
              <input
                type="radio"
                name="options"
                :value="4"
                class="hidden peer"
                v-model="selectedOption"
              />
              <div
                class="w-10 h-10 rounded-full border-2 border-[#BECEDE] flex items-center justify-center cursor-pointer"
                :class="selectedOption === 4 && 'border-[#3C36A7] bg-[#3C36A7]'"
              >
                <img
                  v-if="selectedOption === 4"
                  :src="require(`@/assets/img/check.svg`)"
                  class="w-[15px]"
                  alt="check"
                />
              </div>
            </label>
          </div>
        </div>
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
</script>

<style scoped></style>

<template>
  <div class="flex flex-col h-full relative">
    <div class="flex flex-col flex-1">
      <div className="flex items-start">
        <RobotItem />
        <p
          className="font-bold px-4 py-2 mt-4 rounded-md bg-white border-2 border-[#F6F0FF] text-left w-full"
        >
          First, pick the picture and word that best describes how you are
          feeling right now.
        </p>
      </div>
      <!-- Circular Mood Selector -->
      <div class="flex-1 flex justify-center w-full">
        <div
          class="relative w-[350px] h-[350px] flex justify-center items-center rounded-full border-[74px] border-[#F5F5FC]"
        >
          <!-- Center Text -->
          <div class="absolute flex flex-col justify-center items-center">
            <h2 class="text-2xl font-bold text-blue-800">
              How do you feel<br />right now?
            </h2>
          </div>

          <!-- Mood Options -->
          <div
            v-for="(mood, index) in moods"
            :key="index"
            :style="getPosition(index)"
            class="absolute w-[100px] h-[100px] flex flex-col justify-center items-center rounded-full cursor-pointer"
            @click="setMood(index)"
          >
            <!-- Replace with actual image/icon -->
            <div
              class="bg-blue-100 rounded-full flex items-center justify-center"
            >
              <img
                :src="require(`@/assets/img/${mood.icon}.svg`)"
                :class="`${selectedMood === index ? 'w-[100px]' : 'w-[74px]'}`"
                alt="mood icon"
              />
            </div>
            <p
              :style="{
                ...getTextPosition(index),
                color: selectedMood === index ? `white` : mood.color,
                backgroundColor:
                  selectedMood === index ? mood.color : `transparent`,
              }"
              :class="`text-center text-sm mt-1 ${selectedMood === index && `px-4 py-0.5 rounded-full`}`"
            >
              {{ mood.name }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div
      className="absolute bottom-0 h-[50px] w-full flex justify-end items-center"
    >
      <ButtonItems name="next" @click="() => router.push({ name: 'diary2' })" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import router from '@/router';
import RobotItem from '@/components/RobotItem.vue';
import ButtonItems from '@/components/ButtonItems.vue';

const selectedMood = ref(null);

const moods = ref([
  {
    name: 'Sad',
    icon: 'diary1-sad-icon',
    color: '#007CD6',
  },
  {
    name: 'Angry',
    icon: 'diary1-angry-icon',
    color: '#B81521',
  },
  {
    name: 'Excited',
    icon: 'diary1-excited-icon',
    color: '#F96D30',
  },
  {
    name: 'Content',
    icon: 'diary1-content-icon',
    color: '#D9B341',
  },
  {
    name: 'Thankful',
    icon: 'diary1-thankful-icon',
    color: '#BFBB30',
  },
  {
    name: 'Proud',
    icon: 'diary1-proud-icon',
    color: '#A0BF00',
  },
  {
    name: 'Happy',
    icon: 'diary1-happy-icon',
    color: '#CFAE08',
  },
  {
    name: 'Confused',
    icon: 'diary1-confused-icon',
    color: '#0F9B35',
  },
  {
    name: 'Bored',
    icon: 'diary1-bored-icon',
    color: '#812088',
  },
  {
    name: 'Embarrassed',
    icon: 'diary1-embarrassed-icon',
    color: '#F1649B',
  },
  {
    name: 'Worried',
    icon: 'diary1-worried-icon',
    color: '#57B109',
  },
]);

const getPosition = (index) => {
  const total = moods.value.length;
  const angle = (index / total) * (2 * Math.PI) - (130 * Math.PI) / 180;
  const baseRadius = 150;
  const radius = selectedMood.value === index ? baseRadius + 30 : baseRadius;
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle) + 12;
  return {
    transform: `translate(${x}px, ${y}px)`,
  };
};

const getTextPosition = (index) => {
  const total = moods.value.length;
  const angle = (index / total) * (2 * Math.PI) - (140 * Math.PI) / 180;
  const baseOffset = 70;
  const offset = selectedMood.value === index ? baseOffset + 20 : baseOffset;

  const xOffset = offset * Math.cos(angle) - 3;
  const yOffset = offset * Math.sin(angle) - 48;

  return {
    transform: `translate(${xOffset}px, ${yOffset}px)`,
  };
};

// Handle mood selection
const setMood = (index) => {
  if (selectedMood.value === index) selectedMood.value = null;
  else selectedMood.value = index;
};
</script>

<style scoped></style>

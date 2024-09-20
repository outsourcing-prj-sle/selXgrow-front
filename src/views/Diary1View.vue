<template>
  <div class="flex justify-center items-center h-screen">
    <!-- Circular Mood Selector -->
    <div
      class="relative w-[350px] h-[350px] flex justify-center items-center rounded-full border-[74px] border-[#F5F5FC]"
    >
      <!-- Center Text -->
      <div class="absolute flex flex-col justify-center items-center">
        <h2 class="text-xl font-bold text-blue-800">
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
            :class="`${ mood.isSelected ? 'w-[100px]' : 'w-[74px]' }`"
            alt="mood icon"
          />
        </div>
        <p
          :style="{ ...getTextPosition(index), color: mood.isSelected ? `white` : mood.color, backgroundColor: mood.isSelected ? mood.color : `transparent` }"
          :class="`text-center text-sm mt-1 ${mood.isSelected && `px-4 py-0.5 rounded-full`}`"
        >
          {{ mood.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const moods = ref([
  { 
    name: 'Sad', 
    icon: 'diary1-sad-icon', 
    color: '#007CD6',
    isSelected: true
  },
  {
    name: 'Angry',
    icon: 'diary1-angry-icon',
    color: '#B81521',
    isSelected: false
  },
  {
    name: 'Excited',
    icon: 'diary1-excited-icon',
    color: '#F96D30',
    isSelected: false
  },
  {
    name: 'Content',
    icon: 'diary1-content-icon',
    color: '#D9B341',
    isSelected: false
  },
  {
    name: 'Thankful',
    icon: 'diary1-thankful-icon',
    color: '#BFBB30',
    isSelected: false
  },
  {
    name: 'Proud',
    icon: 'diary1-proud-icon',
    color: '#A0BF00',
    isSelected: false
  },
  {
    name: 'Happy',
    icon: 'diary1-happy-icon',
    color: '#CFAE08',
    isSelected: false
  },
  {
    name: 'Confused',
    icon: 'diary1-confused-icon',
    color: '#0F9B35',
    isSelected: false
  },
  {
    name: 'Bored',
    icon: 'diary1-bored-icon',
    color: '#812088',
    isSelected: false
  },
  {
    name: 'Embarrassed',
    icon: 'diary1-embarrassed-icon',
    color: '#F1649B',
    isSelected: false
  },
  {
    name: 'Worried',
    icon: 'diary1-worried-icon',
    color: '#57B109',
    isSelected: false
  },
]);

const getPosition = (index) => {
  const total = moods.value.length;
  const angle = (index / total) * (2 * Math.PI) - (130 * Math.PI) / 180;
  const radius = 150;
  const x = moods.value[index].isSelected ? radius * Math.cos(angle) - 10 : radius * Math.cos(angle);
  const y = moods.value[index].isSelected ? radius * Math.sin(angle) + 2 : radius * Math.sin(angle) + 12;
  return {
    transform: `translate(${x}px, ${y}px)`,
  };
};

const getTextPosition = (index) => {
  const total = moods.value.length;
  const angle = (index / total) * (2 * Math.PI) - (140 * Math.PI) / 180;
  const offset = 70;

  const xOffset = moods.value[index].isSelected ? offset * Math.cos(angle) - 18 : offset * Math.cos(angle);
  const yOffset = moods.value[index].isSelected ? offset * Math.sin(angle) - 63 : offset * Math.sin(angle) - 40;

  return {
    transform: `translate(${xOffset}px, ${yOffset}px)`,
  };
};

// Handle mood selection
const setMood = (index) => {
  moods.value.map((m) => m.isSelected = false)

  moods.value[index].isSelected = !moods.value[index].isSelected
};
</script>

<style scoped></style>

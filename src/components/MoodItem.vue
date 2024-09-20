<template>
    <div>
        <picture className="bg-[#f3f5f7] rounded-full flex items-center justify-center">
            <img
            :className="`${isLowNumber && 'p-4'}`"
            :src="require(`@/assets/img/${selectedMood.icon}.svg`)"
            alt="mood icon"
            />
        </picture>
        <p v-if="showText && !isLowNumber">Extremely</p>
        <p v-if="showText && isLowNumber">A Litter</p>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    showText: {
        type: Boolean,
        default: false
    },
    isLowNumber: {
        type: Boolean,
        default: false
    },
})

const moods = [
    { 
        name: 'Sad', 
        icon: 'diary1-sad-icon', 
        color: '#007CD6' 
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
];

const selectedMood = computed(() => {
    return moods.find((m) => m.name === props.name)
});
</script>

<style scoped>
    p {
        font-weight: bold;
        padding: 10px 0;
        font-size: 18px;
    }
</style>
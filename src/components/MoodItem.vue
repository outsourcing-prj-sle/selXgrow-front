<template>
    <div>
        <picture className="bg-[#f3f5f7] rounded-full flex items-center justify-center w-24 aspect-square">
            <img
            :className="`${isLowNumber && 'p-4'} w-full aspect-square`"
            :src="require(`@/assets/img/${selectedMood.icon}.svg`)"
            alt="mood icon"
            />
        </picture>
        <p :style="textColor && `color: ${textColor}`" v-if="!!textContent">{{ textContent }}</p>
    </div>
</template>

<script setup>
import { MOODS } from '@/utils/constant';
import { computed } from 'vue';

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    textContent: {
        type: String,
    },
    textColor: {
        type: Text,
    },
    isLowNumber: {
        type: Boolean,
        default: false
    },
})

const selectedMood = computed(() => {
    return MOODS[props.name]
});
</script>

<style scoped>
    p {
        font-weight: bold;
        padding: 10px 0;
        font-size: 18px;
    }
</style>
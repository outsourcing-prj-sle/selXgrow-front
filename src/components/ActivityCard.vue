<template>
    <picture class="bg-white border-[#EFF3FB] border-2 py-2 px-6 rounded-2xl relative">
        <img :class="positionStyle" :src="require(`@/assets/img/start/activity_step_${step}.svg`)" :alt="`activity_${step}`"/>
        <p class=" py-2 font-semibold">Activity {{step}}</p>
        <picture v-if="!props.active" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full w-14 aspect-square flex px-4 item-center shadow-2xl drop-shadow-2xl" type="button">
            <img :src="require('@/assets/img/inactive.svg')" alt="inactive" />
        </picture>
    </picture>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    step: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    }
})

const positionStyle = computed(() => {
    if(props.step === 2) return '-mr-3 ml-3';
    if(props.step === 3) return 'mr-4 -ml-4';
    if(props.step === 4) return 'mr-2 -ml-2';

    return '-mr-1 ml-1';
})
</script>

<style scoped>
</style>
<template>
    <div className="flex items-start">
        <RobotItem />
        <p className="font-bold px-4 py-2 mt-4 rounded-md bg-white border-2 border-[#F6F0FF] text-left">
            Next, use the slider to show the 
            <span className="underline underline-offset-2">intensity</span>
            of your emotion, or 
            <span className="underline underline-offset-2">how much</span>
            you are feeling that way
        </p>
    </div>
    <div className="flex flex-col px-36 justify-center items-center gap-12">
        <p className="text-white w-full bg-[#494857] py-4 break-all text-2xl rounded-xl">
            How <span className="text-[#80beeb]">{{ props.selectedFeel }}</span> do you feel?
        </p>
        <div className="flex flex-col w-28 aspect-square bg-[#19146a] rounded-2xl justify-center">
            <p className="text-white text-4xl">{{ feelScore }}</p>
            <p className="text-white opacity-50">{{ feelDescription }}</p>
        </div>
    </div>
</template>

<script setup>
import RobotItem from '@/components/RobotItem.vue';

import { computed, ref } from 'vue';

const props = defineProps({
    selectedFeel: {
        type: String,
        required: true,
        default: 'sad'
    }
});
const feelScore = ref(1)

const feelDescription = computed(() => {
    return ['A Little', 'Pretty', 'Quite', 'Very', 'Extremely'][feelScore.value - 1]
})
</script>

<style scoped>
</style>

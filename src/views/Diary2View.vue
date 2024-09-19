<template>
    <div className="flex flex-col justify-between h-full mb-8">
        <div>
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
            <div className="flex flex-col px-36 justify-center items-center">
                <p className="text-white w-full bg-[#494857] py-4 break-all text-2xl rounded-xl">
                    How <span className="text-[#80beeb]">{{ props.selectedFeel }}</span> do you feel?
                </p>
                <div className="flex flex-col w-28 aspect-square bg-[#19146a] rounded-2xl justify-center mt-12 -mb-6">
                    <p className="text-white text-4xl">{{ feelScore }}</p>
                    <p className="text-white opacity-50">{{ feelDescription }}</p>
                </div>
                <div className="flex justify-between items-center w-full px-16 gap-8">
                    <MoodItem name="Sad" showText="true" isLowNumber="true" />
                    <div className="bg-gradient-to-r from-white to-[#8785B2] rounded-2xl flex w-full justify-between items-center px-2 py-1">
                        <button 
                            v-for="i in [1, 2, 3, 4, 5]" 
                            :key="i" 
                            className="font-bold aspect-square px-2 rounded-full" 
                            type="button"
                            @click="clickFeelScoreHandler(i)"
                        >
                        {{ i }}
                        </button>
                    </div>
                    <MoodItem name="Sad" showText="true" />
                </div>
            </div>
        </div>
        <div className="flex justify-between items-center">
            <ButtonItems name="prev" @click="() => router.push({ name: 'diary1' })" />
            <ButtonItems name="next" @click="() => router.push({ name: 'diary3' })"/>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import router from '@/router';

import ButtonItems from '@/components/ButtonItems.vue';
import MoodItem from '@/components/MoodItem.vue';
import RobotItem from '@/components/RobotItem.vue';

const props = defineProps({
    selectedFeel: {
        type: String,
        required: true,
        default: 'sad'
    }
});

const feelScore = ref(1);

const feelDescription = computed(() => {
    return ['A Little', 'Pretty', 'Quite', 'Very', 'Extremely'][feelScore.value - 1]
});

const clickFeelScoreHandler = (number) => {
    feelScore.value = number;
};
</script>

<style scoped>
</style>

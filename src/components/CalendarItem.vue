<template>
    <div className="flex flex-col">
        <div className="flex justify-between items-center">
            <ButtonItems name="calendarPrev" />
            <p className="flex-3 font-bold text-2xl">2024.09</p>
            <ButtonItems name="calendarNext" />
        </div>
        <div className="flex flex-col w-full h-full">
            <div className="flex justify justify-between items-center week px-2 py-1">
                <p v-for="(w, i) in DIARY_WEEKS" :key="i">{{ w }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { DIARY_WEEKS } from '@/utils/constant';
import ButtonItems from './ButtonItems.vue';
</script>

<style scoped>
.week {
    background-color: #f7f7fc;
}
</style>
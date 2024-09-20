<template>
    <div className="flex flex-col justify-between h-full mb-12">
        <div>
            <div className="flex items-start">
                <RobotItem />
                <p className="font-bold px-4 py-2 mt-4 rounded-md bg-white border-2 border-[#F6F0FF] text-left w-full">
                    You can see your emotional timeline.
                </p>
            </div>
        </div>
        <div className="flex h-full w-full">
            <div className="mx-8 sel-diary relative w-[65%]">
                <p className="ml-20 text-2xl text-left font-bold mb-4">SEL Diary</p>
                <div className="bg-white rounded-2xl border-[#E9EBEC] border h-full w-full overflow-y-scroll">
                    <DiaryContents 
                        v-for="d in data"
                        :key="d"
                        :name="MOODS[d.name].name" 
                        date="September 5, 2024 1:30pm"
                        :highlight-content="`${MOODS_LEVEL[d.level].toLowerCase()} ${MOODS[d.name].name}`"
                        :color="MOODS[d.name].highlightColor"
                    />
                </div>
            </div>
            <div className="w-[35%]">
                <CalendarItem />
            </div>
        </div>
    </div>
</template>

<script setup>
import CalendarItem from '@/components/CalendarItem.vue';
import DiaryContents from '@/components/DiaryContents.vue';
import RobotItem from '@/components/RobotItem.vue';
import { MOODS, MOODS_LEVEL } from '@/utils/constant';

const data = [
    {
        name: 'Happy',
        level: 3
    },
    {
        name: 'Sad',
        level: 1
    }
]
</script>

<style scoped>
.sel-diary::after {
    content: '';
    position: absolute;
    top: calc(100% - 50px);
    left: -30px;
    background: url('@/assets/img/pencil.svg') no-repeat;
    width: 100%;
    height: 100%;
}
</style>

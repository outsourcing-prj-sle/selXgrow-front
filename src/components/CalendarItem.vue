<template>
    <div class="flex flex-col">
        <div class="flex justify-between items-center px-2 pb-4">
            <ButtonItems name="calendarPrev" @click="changeMonth(-1)" />
            <p class="flex-3 font-extrabold text-lg">{{ formattedMonthYear }}</p>
            <ButtonItems name="calendarNext" @click="changeMonth(1)" />
        </div>
        <div class="flex flex-col w-full h-full calendar">
            <div class="flex justify justify-between items-center week px-2 py-1">
                <p v-for="(w, i) in DIARY_WEEKS" :key="i">{{ w[0] }}</p>
            </div>
            <div v-for="(f, i) in formattedDates" :key="i" class="flex justify justify-between items-center px-2 py-1 days">
                <p v-for="(d, i) in f" :key="i">{{ d.date }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { DIARY_WEEKS } from '@/utils/constant';
import ButtonItems from './ButtonItems.vue';

const currentDate = new Date().toLocaleDateString('en-US').split("/");
const currentMonth = ref(parseInt(currentDate[0]) - 1);
const currentYear = ref(parseInt(currentDate[2]));

const formattedDates = computed(() => {
    const dates = [];
    const startDate = new Date(currentYear.value, currentMonth.value, 1);
    const endDate = new Date(currentYear.value, currentMonth.value + 1, 0);

    let week = [];

    for (let i = 0; i < DIARY_WEEKS.indexOf(startDate.toLocaleString('en-US', { weekday: 'long' })); i++) {
        week.push({ date: '' });
    }

    for (let day = 1; day <= endDate.getDate(); day++) {
        const currentDate = new Date(currentYear.value, currentMonth.value, day);
        const dayOfWeek = currentDate.toLocaleString('en-US', { weekday: 'long' });
        const formattedDate = currentDate.toLocaleDateString('en-US', { day: 'numeric' });

        week.push({ date: formattedDate, dayOfWeek });

        if (dayOfWeek === 'Sunday') {
            dates.push(week);
            week = [];
        }
    }

    if (week.length > 0) {
        if(week.length < 7) {
            for(let i = 0; week.length < 7; i++) {
                week.push({ date: '', dayOfWeek: '' });
            }
        }

        dates.push(week);
    }

    return dates;
});

const formattedMonthYear = computed(() => {
    return `${currentYear.value}.${String(currentMonth.value + 1)}`;
});

const changeMonth = (increment) => {
    currentMonth.value += increment;
    if (currentMonth.value < 0) {
        currentMonth.value = 11;
        currentYear.value -= 1;
    } else if (currentMonth.value > 11) {
        currentMonth.value = 0;
        currentYear.value += 1;
    }
};
</script>

<style scoped>
p {
    font-weight: bold;
}
.calendar p {
    width: 24px;
}
.calendar .week {
    background-color: #f7f7fc;
}
.calendar .week>p {
    color: #1F3BB3;
}
.calendar .week>p:last-child {
    color: #F377D2
}
.calendar .days {
    border-bottom: 1px solid #D1D8E5;
}
</style>
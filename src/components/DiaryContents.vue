<template>
    <div class="w-full flex items-start justify-start gap-4 px-4 pt-1.5 h-[128px]" :data-index="index">
        <MoodItem :name="props.name" :level="props.level" :textContent="props.name" :textColor="props.color" size="20" fontSize="14" />
        <div class="flex flex-col justify-start items-start diary-content">
            <p>{{ props.date }}</p>
            <p>I am feeling 
                <span :style="`box-shadow: inset 0 20px ${props.highlightColor}, 0 -4px ${props.highlightColor};`">{{ props.highlightContent }}</span> 
                because of something {{ props.reason.toLowerCase() }}
            </p>
        </div>
    </div>
</template>

<script setup>
import MoodItem from './MoodItem.vue';

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true
    },
    highlightContent: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    highlightColor: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true,
    },
    index: {
        type: Number,
        required: true,
    }
})
</script>

<style scoped>
p {
    width: 100%;
    text-align: left;
    word-break: keep-all;
    font-weight: 900;
    color: black;
    line-height: 30px;
    z-index: 1;
}
.diary-content>p:first-child {
    color: #9A8C81
}
</style>
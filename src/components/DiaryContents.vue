<template>
    <div className="w-full flex items-start justify-start gap-4 p-8">
        <MoodItem :name="props.name" :textContent="props.name" :textColor="props.color" />
        <div className="flex flex-col justify-start items-start diary-content">
            <p>{{ props.date }}</p>
            <p>I am feeling <span :style="`box-shadow: inset 0px 20px ${props.color};`">{{ props.highlightContent }}</span> because of something related my friends.</p>
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
    }
})
</script>

<style scoped>
    p {
        width: 100%;
        text-align: left;
        text-decoration: underline solid 3px;
        text-decoration-color: #EFEFEF;
        text-underline-offset: 3px;
        word-break: keep-all;
        font-weight: bold;
        color: black;
        line-height: 30px;
    }
    .diary-content>p:first-child {
        color: #9A8C81
    }
</style>
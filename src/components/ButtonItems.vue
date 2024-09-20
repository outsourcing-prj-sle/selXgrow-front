<template>
    <button :class="buttonClasses" type="button">
        {{ selectedItem.content }}
    </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    name: {
        type: String,
        required: true
    }
})

const meta = [
    {
        name: "prev",
        content: "←",
        background: "#82c2fd",
    },
    {
        name: "next",
        content: "→",
        background: "#82c2fd",
    },
    {
        name: "calendarPrev",
        content: "<",
        background: "#e1f0ff",
    },
    {
        name: "calendarNext",
        content: ">",
        background: "#e1f0ff",
    }
];

const selectedItem = computed(() => {
    return meta.find((m) => m.name === props.name);
});

const buttonClasses = computed(() => {
    const bgColor = selectedItem.value?.background;
    const fontColor = selectedItem.value?.font;
    
    return `px-6 py-2 font-bold text-2xl rounded-full ${bgColor ? `bg-[${bgColor}]` : ''} ${fontColor ? `text-[${fontColor}]` : ''}`;
});
</script>

<style scoped>
</style>

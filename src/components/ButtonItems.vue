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
        px: 6,
        py: 2,
    },
    {
        name: "next",
        content: "→",
        background: "#82c2fd",
        px: 6,
        py: 2,
    },
    {
        name: "calendarPrev",
        content: "<",
        background: "#e1f0ff",
        px: 2,
        isAspect: true,
        text: 'md'
    },
    {
        name: "calendarNext",
        content: ">",
        background: "#e1f0ff",
        px: 2,
        isAspect: true,
        text: 'md'
    }
];

const selectedItem = computed(() => {
    return meta.find((m) => m.name === props.name);
});

const buttonClasses = computed(() => {
    const bgColor = selectedItem.value?.background ? `bg-[${selectedItem.value.background}]` : '';
    const fontColor = selectedItem.value?.font ? `text-[${selectedItem.value.font}]` : '';
    const px = selectedItem.value?.px ? `px-${selectedItem.value.px}` : '';
    const py = selectedItem.value?.py ? `py-${selectedItem.value.py}` : '';
    const isAspect = selectedItem.value?.isAspect ? 'aspect-square' : '';
    const text = selectedItem.value?.text ? `text-${selectedItem.value.text}` : 'text-2xl';

    return `${px} ${py} font-bold ${text} rounded-full ${bgColor} ${fontColor} ${isAspect}`;
});
</script>

<style scoped>
</style>

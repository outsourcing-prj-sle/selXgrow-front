<template>
    <button className="bg-[#82c2fd] px-6 py-2 font-bold text-2xl rounded-full" type="button">{{ selectedItem.content }}</button>
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
            content: "←"
        },
        {
            name: "next",
            content: "→"
        }
    ]

    const selectedItem = computed(() => {
        return meta.find((m) => m.name === props.name)
    });
</script>

<style scoped>
</style>
<template>
    <picture className="flex justify-center items-center h-36 w-36">
        <img :src="require(`@/assets/img/robot_${imageName}.svg`)" :style="computedRotateVal" />
    </picture>
</template>

<script setup>
import { computed } from 'vue';

    const props = defineProps({
        name: {
            type: String,
            validator: (val) => ['smile', 'normal'].includes(val)
        },
        rotate: {
            type: Number,
            validator: (val) => [-12, 0, 12].includes(val)
        }
    });

    const getRandomVal = (arr) => {
        const randomValue = arr[Math.floor(Math.random() * arr.length)];
        console.log("Randomly selected value:", randomValue);

        return randomValue;
    };

    const imageName = props.name || getRandomVal(['smile', 'normal']);
    const rotateVal = (props.rotate || getRandomVal([-12, 0, 12]));

    const computedRotateVal = computed(() => {
        return `rotate: ${rotateVal}deg`
    });
</script>

<style scoped>
</style>

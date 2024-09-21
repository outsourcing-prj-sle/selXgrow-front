<template>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-1/2 aspect-square flex flex-col justify-center items-center bg-white gap-16">
        <img src="@/assets/img/welcome.png" />
        <div className="flex justify-between items-center border-2 border-[#3e389c] rounded-full h-16">
            <button @click="nextClickHandler" type="button" className="px-8 py-4 rounded-full bg-[#3e389c] text-white mx-0.5">START</button>
            <img src="@/assets/img/header_logo.svg" className="h-full py-2 pl-4 pr-8"/>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const nextClickHandler = () => {
    router.push({
        name: 'home'
    })
}
</script>

<style scoped>
</style>

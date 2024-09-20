<template>
    <div class="w-full h-full bg-[url('@/assets/img/bg.svg')] bg-no-repeat bg-cover">
        <div class="flex w-full h-[calc(100%-32px)] overflow-hidden">
            <AppSidebar />
            <div class="w-full mt-24 px-12 flex flex-col gap-4">
                <AppHeader />
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import AppSidebar from '@/components/AppSidebar.vue';

onMounted(() => {
  const routerView = document.querySelector('router-view');
  console.log('safdasdasds')
  console.log(AppSidebar)
  console.log('router-view:', routerView);
});
</script>

<style scoped>
</style>

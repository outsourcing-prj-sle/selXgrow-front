<template>
    <div class="w-full h-full p-10">
        <div class="flex w-full h-full rounded-2xl border-4 border-gray-400">
            <AppSidebar />
            <div>
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

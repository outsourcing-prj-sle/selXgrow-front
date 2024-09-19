<template>
  <AppLoading />
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue';
import AppLoading from '@/components/AppLoading';

onMounted(() => {
  console.log('app mounted')
});
</script>

<style>
@font-face {
  font-family: 'pretendard';
  src: url('@/assets/font/PretendardVariable.ttf');
}

#app {
  font-family: 'pretendard';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #555195;
  height: 100vh;
  overflow: auto;
}
</style>

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

::-webkit-scrollbar {
    width: 22px;
}

::-webkit-scrollbar-thumb {
    background: #C4C2BD;
    border-radius: 20px;
    border: 8px solid white;
}

::-webkit-scrollbar-button {
  border-radius: 100%;
  height: 20px;
}
</style>

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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  overflow: auto;
}
</style>

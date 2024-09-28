<template>
  <header
    class="flex justify-between w-full pt-8 pb-2 mb-4 border-b-[#555195] border-b-2 border-opacity-20 relative"
    v-if="showHeader"
  >
    <div class="font-extrabold text-2xl flex items-start gap-2">
      <span class="text-sm">▶</span> {{ title }}
    </div>
    <div class="flex gap-4 justify-center items-center">
      <div
        class="text-sm font-semibold bg-[#ededf5] rounded-full px-8 py-1.5 flex gap-x-3"
        v-if="date && time"
      >
        <p>{{ date }}</p>
        <p>{{ time }}</p>
      </div>
      <div class="cursor-pointer" @click="goMyInfo">
        <img
          class="shrink-0 max-w-full aspect-[1] w-8"
          src="@/assets/img/header_my_info.svg"
          alt="my_info"
        />
      </div>
      <div class="cursor-pointer" @click="logout">
        <img
          class="shrink-0 max-w-full aspect-[1] w-8"
          src="@/assets/img/header_logout.svg"
          alt="logout"
        />
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/store/userStore.js';
import { useHeaderStore } from '@/store/headerStore.js';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const router = useRouter();
const { locale } = useI18n();

const showHeader = computed(() => route.meta.headerVisible);

const userStore = useUserStore();
const headerStore = useHeaderStore();
const userId = computed(() => userStore.token);
const loginType = computed(() => userStore.type);
// todo :: route.meta.title || { stateStore.title } || 'Title'
const title = computed(() => {
  let result = 'Title';
  if (route.meta.needTitle) {
    result = headerStore.title;
  } else if (route.meta.headerTitle) {
    result = route.meta.headerTitle;
  }
  return result;
});
const date = computed(() => headerStore.date);
const time = computed(() => headerStore.time);
// todo :: const date = computed(() => route.meta.needDate && { stateStore.title });

onMounted(() => {
  headerStore.updateDate();

  const interval = setInterval(() => {
    headerStore.updateDate();
  }, 1000);

  onBeforeUnmount(() => clearInterval(interval));
});

const logout = () => {
  alert('로그아웃');
};

const goMyInfo = () => {
  alert('내정보');
};
</script>

<style>
header::before {
  content: '';
  position: absolute;
  width: 50px;
  height: 8px;
  background-color: #555195;
  bottom: -2px;
  left: 0;
}
</style>

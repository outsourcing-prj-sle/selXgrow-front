<template>
  <div class="flex flex-col bg-white">
    <header
      class="flex justify-between w-full pt-16 px-8"
      v-if="showHeader"
    >
      <div class="font-bold text-3xl text-black">
        {{ title }}
      </div>
      <div class="flex">
        <div class="text-base font-bold text-blue-300 mr-4 content-end">
          09.20.2024 ~ 09.28.2024
          <!-- {{ date }} -->
        </div>
        <div class="cursor-pointer" @click="goMyInfo">
          <img
            class="shrink-0 max-w-full aspect-[1] w-10 mr-2"
            src="@/assets/img/header_my_info.png"
            alt="my_info"
          />
        </div>
        <div class="cursor-pointer" @click="logout">
          <img
            class="shrink-0 max-w-full aspect-[1] w-10 mr-2"
            src="@/assets/img/header_logout.png"
            alt="logout"
          />
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useUserStore } from '@/store/userStore.js';
  import { useI18n } from 'vue-i18n';

  const route = useRoute();
  const router = useRouter();
  const { locale } = useI18n();

  const showHeader = computed(() => route.meta.headerVisible);

  const userStore = useUserStore();
  const userId = computed(() => userStore.token);
  const loginType = computed(() => userStore.type);
  // todo :: route.meta.title || { stateStore.title } || 'Title'
  const title = computed(() => route.meta.headerTitle || 'Title');
  // todo :: const date = computed(() => route.meta.needDate && { stateStore.title });

  const logout = () => {
    alert('로그아웃')
  };

  const goMyInfo = () => {
    alert('내정보')
  };
</script>

<style>
/* Footer 스타일 */
</style>

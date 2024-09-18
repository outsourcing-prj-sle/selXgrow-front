<template>
  <div class="flex flex-col bg-white">
    <div
      class="flex gap-5 justify-between py-1.5 pr-9 pl-20 w-full border border-solid border-neutral-200 max-md:flex-wrap max-md:px-5 max-md:max-w-full items-center"
      v-if="showSidebar"
    >
      <div class="cursor-pointer rounded-s-3xl" @click="goMain">
        <img
          class="shrink-0 max-w-full aspect-[3.45] w-[65px]"
          src="@/assets/img/logo_sidebar.png"
          alt="logo_header"
        />
      </div>
    </div>
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

  const showSidebar = computed(() => route.meta.sidebarVisible);
  const isMyInfoPage = computed(() => route.meta.isMyInfoPage);
  const isMySELView = computed(() => route.meta.isMySELView);

  const userStore = useUserStore();
  const userId = computed(() => userStore.token);
  const loginType = computed(() => userStore.type);

  const goMain = () => {
    router.push({ name: 'home' });
  };

  const logout = () => {
    userStore.logout();
    router.push({ name: 'start' });
  };

  const checkId = () => {
    console.log(userId.value);
  };

  const goMyInfoBtn = () => {
    if (userId.value) {
      router.push({ name: 'userInfo' });
    } else {
      router.push({ name: 'login' });
    }
  };

  const goStudentSEL = () => {
    router.push({ name: 'mySEL' });
  };

  const waitAlert = () => {
    alert('아직 준비중 입니다.');
  };

  const changeLanguage = (lang) => {
    locale.value = lang;
  };
</script>

<style>
/* Footer 스타일 */
</style>

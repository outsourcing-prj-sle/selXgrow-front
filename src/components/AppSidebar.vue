<template>
  <div class="flex h-full w-36">
    <div class="flex flex-col h-full w-full" v-if="showSidebar">
      <!-- 로고 -->
      <div
        class="cursor-pointer flex justify-center items-center mt-6 mb-4 mx-2"
        @click="goMain"
      >
        <img
          class="w-full"
          src="@/assets/img/header_logo.svg"
          alt="logo_sidebar"
        />
      </div>
      <!-- 목록 -->
      <div
        class="flex flex-col justify-between bg-[#19146a] py-14 pb-12 h-full rounded-r-[40px]"
      >
        <div class="flex flex-col">
          <SidebarItems :isSelected="isCheckIn" @click="goCheckIn">
            SEL<br />Check-in
          </SidebarItems>
          <SidebarItems :isSelected="isDiary" @click="goDiary">
            SEL<br />Diary
          </SidebarItems>
          <SidebarItems :isSelected="isAdventyres" @click="goAdventures">
            SEL<br />Adventures
          </SidebarItems>
          <SidebarItems :isSelected="isLessonPlan" @click="goLessonPlan">
            SEL<br />Lesson Plan
          </SidebarItems>
        </div>
        <!-- 푸터 -->
        <div class="text-white text-opacity-50 text-xs px-5 text-left">
          <p>ⓒ 2024</p>
          <p>Grow X Education.</p>
          <p>All right reserved.</p>
          <p>growxeducation@gmail.com</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/store/userStore.js';
import { useI18n } from 'vue-i18n';
import SidebarItems from '@/components/SidebarItems';

const route = useRoute();
const router = useRouter();
const { locale } = useI18n();

const showSidebar = computed(() => route.meta.sidebarVisible);
const isDiary = computed(() => route.meta.isDiary);
const isAdventyres = computed(() => route.meta.isAdventyres);
const isCheckIn = computed(() => route.meta.isCheckIn);
const isLessonPlan = computed(() => route.meta.isLessonPlan);

const userStore = useUserStore();
const userId = computed(() => userStore.token);

const termOptions = ref([]);
const termStartText = ref('Terms and conditions');

const goMain = () => {
  // router.push({ name: 'home' });
};

const goDiary = () => {
  // if (isDiary.value) return;
  router.push({ name: 'diary1' });
};

const goAdventures = () => {
  // if (isAdventyres.value) return;
  router.push({ name: 'adventures' });
};

const goCheckIn = () => {
  // if (isCheckIn.value) return;
  router.push({
    name: 'checkInStart',
  });
};

const goLessonPlan = () => {
  // if (isLessonPlan.value) return;
  router.push({ name: 'lesson-plan' });
};

const waitAlert = () => {
  alert('아직 준비중 입니다.');
};
</script>

<style>
p {
  word-break: break-all;
}
</style>

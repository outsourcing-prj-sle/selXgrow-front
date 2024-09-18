<template>
  <div class="flex h-full">
    <div
      class="flex flex-col h-full bg-gray-100 justify-between"
      v-if="showSidebar"
    >
      <div class="flex flex-col">
        <!-- 로고 -->
        <div class="p-2 mb-40">
          <div class="cursor-pointer rounded-ss-[40px] overflow-hidden bg-white" @click="goMain">
            <img
              class="shrink-0 max-w-full aspect-[3.45] w-80"
              src="@/assets/img/logo_sidebar.png"
              alt="logo_sidebar"
            />
          </div>
        </div>
        <!-- 목록 -->
        <div class="flex flex-col">
          <div
            class="flex flex-1 mr-2 pl-8 py-6 text-2xl font-bold text-gray-600 rounded-e-2xl"
            :class="{
              'text-white bg-gray-600': isDiary,
            }"
            @click="goDiary"
          >
            SEL Diary
          </div>
          <div 
            class="flex flex-1 mr-2 pl-8 py-6 text-2xl font-bold text-gray-600 rounded-e-2xl" 
            :class="{
              'text-white bg-gray-600': isAdventyres,
            }"
            @click="goAdventures"
          >
            SEL Adventyres
          </div>
          <div 
            class="flex flex-1 mr-2 pl-8 py-6 text-2xl font-bold text-gray-600 rounded-e-2xl" 
            :class="{
              'text-white bg-gray-600': isCheckIn,
            }"
            @click="goCheckIn"
          >
            SEL Check-in
          </div>
          <div 
            class="flex flex-1 mr-2 pl-8 py-6 text-2xl font-bold text-gray-600 rounded-e-2xl" 
            :class="{
              'text-white bg-gray-600': isLessonPlan,
            }"
            @click="goLessonPlan"
          >
            SEL Lesson Plan
          </div>
        </div>
      </div>
      <div class="flex flex-col pb-6">
        <!-- 드롭다운 -->
        <div class="p-2 w-full mb-3">
          <SidebarDropdown
            class="w-full"
            :objectOptions="termOptions"
            :startText="termStartText"
            :openMax="true"
            :openWay="'left'"
            @update:selectedOption="handleSelection1"
          />
        </div>
        <!-- 푸터 -->
        <div class="pl-8 text-gray-400 text-[16px] text-left">
          <img
            class="shrink-0 max-w-full aspect-[2.45] w-40 mb-2"
            src="@/assets/img/logo_sidebar_growX.png"
            alt="logo_sidebar_growX"
          />
          <p>1600 Holloway Avenue,</p>
          <p>San Franciso, CA 94132</p>
          <p>TEL +1 000-000-0000</p>
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
  import SidebarDropdown from '@/components/SidebarDropdown';

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
    if (isDiary.value) return;
    router.push({ name: 'home' });
  };

  const goAdventures = () => {
    if (isAdventyres.value) return;
    router.push({ name: 'adventures' });
  };

  const goCheckIn = () => {
    if (isCheckIn.value) return;
    router.push({ name: 'check-in' });
  };

  const goLessonPlan = () => {
    if (isLessonPlan.value) return;
    router.push({ name: 'lesson-plan' });
  };

  const waitAlert = () => {
    alert('아직 준비중 입니다.');
  };
</script>

<style>
/* Footer 스타일 */
</style>

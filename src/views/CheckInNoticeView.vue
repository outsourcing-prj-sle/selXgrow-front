<template>
  <section
    class="flex flex-col items-end px-20 mt-4 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full"
  >
    <div class="flex gap-1 items-start self-stretch max-md:max-w-full">
      <div class="flex flex-col self-start font-bold min-w-[150px]">
        <h1 class="text-xl text-blue-500 text-left">
          {{ $t(`report${nttNo}.title`) }}
        </h1>
        <h2 class="mt-1 text-2xl text-neutral-700 text-left">
          {{ $t('report.notification') }}
        </h2>
        <img
          src="@/assets/img/minichar.png"
          alt="minichar"
          class="self-center mt-4 aspect-[1.08] w-[114px]"
        />
      </div>
      <article
        class="flex flex-col grow shrink-0 self-end mt-9 font-medium text-black basis-0 w-fit max-md:max-w-full"
      >
        <div class="self-end text-base leading-8 max-lg:text-sm max-md:text-xs">
          {{ $t('report.period') }} : {{ date }}
        </div>
        <div
          class="flex gap-2.5 self-start mt-1.5 max-md:flex-wrap"
          v-if="needVoice"
        >
          <img
            src="@/assets/img/speaker.png"
            alt="speaker"
            class="shrink-0 aspect-square w-[25px] max-lg:w-[20px]"
          />
          <p
            class="flex-auto my-auto max-md:max-w-full max-lg:text-sm max-md:text-xs text-left"
          >
            {{ $t('report.announce_voice') }}
          </p>
        </div>
        <section
          class="justify-center items-start px-9 py-6 text-left text-base leading-8 rounded-xl border border-solid border-neutral-300 max-md:px-5 max-md:mt-10 max-md:max-w-full max-lg:text-sm max-md:text-xs"
          v-html="$t(`report${nttNo}.announce_content`)"
        ></section>
      </article>
    </div>

    <ReportNotice1 v-if="title === '마음알기 설문1'" @allowNext="allowNext" />
    <ReportNotice2 v-if="title === '마음알기 설문2'" @allowNext="allowNext" />
    <ReportNotice3 v-if="title === '마음알기 설문3'" @allowNext="allowNext" />
    <ReportNotice6 v-if="title === '마음알기 설문6'" @allowNext="allowNext" />
    <div class="pl-[154px] items-end w-full max-md:max-w-full max-lg:pl-0">
      <section
        class="justify-center text-left items-start px-7 py-7 mt-8 max-w-full text-base font-medium leading-8 text-black rounded-xl border border-solid border-neutral-300 max-md:px-5 max-md:max-w-full w-full max-lg:text-sm max-md:text-xs"
        v-if="isAllowed && showAuuounce2"
        v-html="$t(`report${nttNo}.announce_content2`)"
      ></section>
    </div>
    <button
      class="justify-center px-10 py-3 mt-6 text-base text-center text-white whitespace-nowrap bg-blue-500 rounded-3xl max-md:px-5"
      v-if="isAllowed"
      @click="startReport"
    >
      {{ $t('common.start') }}
    </button>
  </section>
</template>

<script>
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ReportNotice1 from '@/components/ReportNotice1.vue';
import ReportNotice2 from '@/components/ReportNotice2.vue';
import ReportNotice3 from '@/components/ReportNotice3.vue';
import ReportNotice6 from '@/components/ReportNotice6.vue';
import ReportService from '@/service/ReportService.js';
import { _mixDate } from '@/utils/utils.js';

import { useHeaderStore } from '@/store/headerStore.js';
const headerStore = useHeaderStore();

const route = useRoute();
const router = useRouter();

const type = ref(parseInt(route.params.type) || 1);
const expired = ref(false);
const needVoice = ref(false);
const nextFlag = ref(false);
const isAllowed = computed(() => {
  return nextFlag.value;
});
const announceTextList = ref([]);

onMounted(() => {
  // 글 읽어주는 기능 on / off
  const needVoiceList = [3, 4, 5, 6];
  if (needVoiceList.includes(type.value)) {
    needVoice.value = true;
  }

  // 설문 종료 여부 확인
  expired.value = false;

  // 로봇 안내 텍스트
  setAnnounceTextList();

  // 헤더 정보 업데이트
  setTitle();
  setDate();
});

const setTitle = () => {
  const t = type.value;
  let title = '';

  switch (t) {
    case 1:
      title = '01.My Mindset';
      break;
    case 2:
      title = '02.About Me';
      break;
    case 3:
      title = '03.How do they feel?';
      break;
    case 4:
      title = '04.How do they feel?';
      break;
    case 5:
      title = '05.How do they feel?';
      break;
    case 6:
      title = '06.How do they feel?';
      break;
  }

  headerStore.initTitle(title);
};

const setDate = () => {
  const date = '09.20.2024 ~ 10.28.2025';
  headerStore.initDate(date);
};

const setAnnounceTextList = () => {
  const t = type.value;
  let textList = [];

  switch (t) {
    case 1:
      textList = [
        'Check 4 if the sentence is QUITE POSSIBLE TO CHANGE for you.',
        'Check 5 if the sentence is COMPLETELY POSSIBLE TO CHANGE for you.',
        'Give the best answer for you for each sentence, even if it is hard to make up your mind.',
        'There area no right or wrong answers.  Just answer each question to the best of your ability.',
        'Check 4 if the sentence is QUITE POSSIBLE TO CHANGE for you.',
        'Check 5 if the sentence is COMPLETELY POSSIBLE TO CHANGE for you.',
        'Give the best answer for you for each sentence, even if it is hard to make up your mind.',
        'There area no right or wrong answers.  Just answer each question to the best of your ability.',
      ];
      break;
    case 2:
      textList = [
        'Check 4 if the sentence is QUITE POSSIBLE TO CHANGE for you.',
        'Check 5 if the sentence is COMPLETELY POSSIBLE TO CHANGE for you.',
        'Give the best answer for you for each sentence, even if it is hard to make up your mind.',
        'There area no right or wrong answers.  Just answer each question to the best of your ability.',
        'Check 4 if the sentence is QUITE POSSIBLE TO CHANGE for you.',
        'Check 5 if the sentence is COMPLETELY POSSIBLE TO CHANGE for you.',
        'Give the best answer for you for each sentence, even if it is hard to make up your mind.',
        'There area no right or wrong answers.  Just answer each question to the best of your ability.',
      ];
      break;
    case 3:
      textList = [
        'Check 4 if the sentence is QUITE POSSIBLE TO CHANGE for you.',
        'Check 5 if the sentence is COMPLETELY POSSIBLE TO CHANGE for you.',
        'Give the best answer for you for each sentence, even if it is hard to make up your mind.',
        'There area no right or wrong answers.  Just answer each question to the best of your ability.',
        'Check 4 if the sentence is QUITE POSSIBLE TO CHANGE for you.',
        'Check 5 if the sentence is COMPLETELY POSSIBLE TO CHANGE for you.',
        'Give the best answer for you for each sentence, even if it is hard to make up your mind.',
        'There area no right or wrong answers.  Just answer each question to the best of your ability.',
      ];
      break;
    case 4:
      textList = [
        'Check 4 if the sentence is QUITE POSSIBLE TO CHANGE for you.',
        'Check 5 if the sentence is COMPLETELY POSSIBLE TO CHANGE for you.',
        'Give the best answer for you for each sentence, even if it is hard to make up your mind.',
        'There area no right or wrong answers.  Just answer each question to the best of your ability.',
        'Check 4 if the sentence is QUITE POSSIBLE TO CHANGE for you.',
        'Check 5 if the sentence is COMPLETELY POSSIBLE TO CHANGE for you.',
        'Give the best answer for you for each sentence, even if it is hard to make up your mind.',
        'There area no right or wrong answers.  Just answer each question to the best of your ability.',
      ];
      break;
    case 5:
      textList = [
        'Check 4 if the sentence is QUITE POSSIBLE TO CHANGE for you.',
        'Check 5 if the sentence is COMPLETELY POSSIBLE TO CHANGE for you.',
        'Give the best answer for you for each sentence, even if it is hard to make up your mind.',
        'There area no right or wrong answers.  Just answer each question to the best of your ability.',
        'Check 4 if the sentence is QUITE POSSIBLE TO CHANGE for you.',
        'Check 5 if the sentence is COMPLETELY POSSIBLE TO CHANGE for you.',
        'Give the best answer for you for each sentence, even if it is hard to make up your mind.',
        'There area no right or wrong answers.  Just answer each question to the best of your ability.',
      ];
      break;
    case 6:
      textList = [
        'Check 4 if the sentence is QUITE POSSIBLE TO CHANGE for you.',
        'Check 5 if the sentence is COMPLETELY POSSIBLE TO CHANGE for you.',
        'Give the best answer for you for each sentence, even if it is hard to make up your mind.',
        'There area no right or wrong answers.  Just answer each question to the best of your ability.',
        'Check 4 if the sentence is QUITE POSSIBLE TO CHANGE for you.',
        'Check 5 if the sentence is COMPLETELY POSSIBLE TO CHANGE for you.',
        'Give the best answer for you for each sentence, even if it is hard to make up your mind.',
        'There area no right or wrong answers.  Just answer each question to the best of your ability.',
      ];
      break;
  }

  announceTextList.value = textList;
};

const allowNext = (flag) => {
  nextFlag.value = flag;
};

const startReport = () => {
  if (expired.value) {
    alert('기간이 지났습니다.');
    return;
  }
  router.push({
    name: 'reportQuestion',
    params: { type: type.value },
  });
};
</script>

<style scoped>
/* 필요한 경우 추가적인 스타일을 여기에 추가할 수 있습니다 */
</style>

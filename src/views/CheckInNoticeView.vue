<template>
  <div class="flex flex-col justify-between h-full relative">
    <div class="flex flex-col flex-1">
      <div class="flex items-start">
        <RobotItem />
        <!-- needVoice -->
        <div class="h-full flex items-center justify-center mr-3">
          <div
            class="w-12 h-12 flex justify-center items-center bg-white rounded-full"
            @click="readAnnounce"
            v-if="needVoice"
          >
            <img
              :src="require(`@/assets/img/checkInSpeaker.svg`)"
              class="w-[20px]"
              alt="checkInSpeaker"
            />
          </div>
        </div>
        <div class="flex flex-1">
          <div
            class="overflow-y-scroll rounded-lg h-[110px] w-full py-2.5 px-4 bg-white border-l-2 text-left custom-scrollbar"
          >
            <p class="text-sm font-semibold text-[#8D36EF]" v-if="needVoice">
              When you click the button, you can hear a voice guidance.
            </p>
            <p
              class="text-sm font-semibold text-[#555195]"
              v-for="(v, i) in announceTextList"
              :key="`announceTextList${i}`"
              :id="`announceTextList${i}`"
              :class="{
                'text-red-500': isSpeaking && currentSentence === i + 1,
              }"
            >
              {{ v }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end w-full">
      <button
        v-if="isAllowed"
        @click="startReport"
        :disabled="!isAllowed"
      ></button>
    </div>
  </div>
  <!-- <section
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
      <p>START</p>
    </button>
  </section> -->
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import RobotItem from '@/components/RobotItem.vue';
// import ReportNotice1 from '@/components/ReportNotice1.vue';
// import ReportNotice2 from '@/components/ReportNotice2.vue';
// import ReportNotice3 from '@/components/ReportNotice3.vue';
// import ReportNotice6 from '@/components/ReportNotice6.vue';
import { waitSec } from '@/utils/utils';

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
const isSpeaking = ref(false);
const currentSentence = ref(0);
const speakCnt = ref(0);

onMounted(() => {
  // 글 읽어주는 기능 on / off
  const needVoiceList = [3, 4, 5, 6];
  if (needVoiceList.includes(type.value)) {
    needVoice.value = true;
  } else {
    needVoice.value = false;
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

const readAnnounce = async () => {
  // 대화 끝나기전엔 비활성화
  if (speakCnt.value > 2) return;
  if (isSpeaking.value) return;
  speakCnt.value += 1;
  isSpeaking.value = true;
  const utterance = new SpeechSynthesisUtterance();
  utterance.lang = 'en-US';
  utterance.rate = 1;
  utterance.pitch = 1;

  for (const index in announceTextList.value) {
    const sentence = announceTextList.value[index];
    utterance.text = sentence;
    utterance.onstart = () => {
      currentSentence.value = parseInt(index) + 1;
      // 현재 읽고 있는 문장으로 스크롤 이동
      const currentTextElement = document.getElementById(
        `announceTextList${index}`
      );
      if (currentTextElement) {
        const container = currentTextElement.closest('.overflow-y-scroll'); // 부모 컨테이너
        if (container) {
          const offset = currentTextElement.offsetHeight; // 강조가 두번째 줄에 오게 글 높이 구함
          // container.scrollTop =
          //   currentTextElement.offsetTop - container.offsetTop - offset; // 스크롤 위치 조정
          const targetScrollTop =
            currentTextElement.offsetTop - container.offsetTop - offset; // 스크롤 위치
          // 부드러운 스크롤 이동
          container.scrollTo({
            top: targetScrollTop,
            behavior: 'smooth', // 부드러운 스크롤
          });
        }
      }
    };
    utterance.onend = () => {
      if (announceTextList.value.length <= currentSentence.value)
        isSpeaking.value = false;
      currentSentence.value = 0;
    };
    window.speechSynthesis.speak(utterance);
    await waitForSentence();
  }
};

const waitForSentence = async () => {
  console.log('start wait');
  await new Promise((resolve) => {
    let interval;
    interval = setInterval(() => {
      if (!currentSentence.value) {
        clearInterval(interval);
        resolve();
      }
    }, 250);
  });
  await waitSec(0.5);
  return;
};
</script>

<style scoped>
/* 웹킷 기반 브라우저용 커스터마이징 */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #d8b5ff; /* 보라색 */
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background-color: #f3f4f6; /* 연한 배경 */
}

/* Firefox용 커스터마이징 */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #d8b5ff #f3f4f6;
}
</style>

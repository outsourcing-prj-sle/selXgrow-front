<template>
  <div class="flex flex-col justify-between h-full relative">
    <PopupWatchCarefully v-if="showWatchCarefully" />
    <PopupTimer v-if="showTimer" :showTimer="showTimer" />

    <div class="flex flex-col flex-1">
      <div class="flex items-start">
        <RobotItem />
        <!-- needVoice -->
        <div
          class="h-full flex items-center justify-center mr-3"
          v-if="!showWatchCarefully"
        >
          <div
            class="w-12 h-12 flex justify-center items-center bg-white rounded-full"
            :class="isSpeaking && 'opacity-30'"
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
        <div class="flex flex-1 flex-col">
          <!-- 진행도 막대 -->
          <div class="w-full flex flex-col justify-end items-end">
            <div class="w-full justify-end flex h-1">
              <div
                v-for="i in totalQuestion"
                class="flex flex-1 bg-[#F0EFF9] pr-2 max-w-[44px]"
                :key="`questionBox${i}`"
              >
                <div
                  class="bg-[#CA9BFF] w-full h-full"
                  v-if="i <= nowPage"
                ></div>
              </div>
            </div>
            <div class="text-[#A7A7A7] font-normal text-sm mt-1">
              {{ `${nowPage} / ${totalQuestion}` }}
            </div>
          </div>
          <template v-if="!showWatchCarefully">
            <!-- 로봇 멘트 -->
            <div
              class="rounded-lg py-2.5 px-4 font-extrabold bg-white w-[650px] border border-[#F6F0FF] text-left custom-scrollbar"
              v-if="type === 1 || type === 2"
            >
              {{ whiteAnnounceText }}
            </div>
            <div
              class="overflow-y-scroll rounded-lg w-full h-[64px] py-2.5 px-4 font-semibold bg-[#494857] text-white border-l-2 text-left custom-scrollbar"
              style="overflow-y: auto; max-height: 110px"
              v-else
            >
              <span class="text-[#CB9CFF]"> {{ questionP }} &nbsp; </span>
              <span
                v-for="(v, i) in announceTextList"
                :key="`announceTextList${i}`"
                :id="`announceTextList${i}`"
                :class="{
                  'text-red-500': isSpeaking && currentSentence === i + 1,
                }"
              >
                <template v-if="v === ''">&nbsp;</template>
                <template v-else>{{ v }}</template>
              </span>
            </div>
          </template>
        </div>
      </div>

      <CheckInReport1View v-if="type === 1" @allowNext="allowNext" />
      <CheckInReport2View v-if="type === 2" @allowNext="allowNext" />
      <CheckInReport3View v-if="type === 3" @allowNext="allowNext" />
      <CheckInReport4View
        v-if="type === 4 && !showWatchCarefully"
        :flag="report4Flag"
        :show="report4Show"
        @allowNext="allowNext"
      />
      <CheckInReport5View v-if="type === 5" @allowNext="allowNext" />
      <CheckInNotice6View v-if="type === 6" @allowNext="allowNext" />
    </div>

    <div
      class="absolute bottom-0 h-[70px] w-full flex justify-between items-center"
      v-if="showButtons"
    >
      <ButtonItems name="prev" @click="() => goPrev()" />
      <ButtonItems
        v-if="!isLastPage"
        name="next"
        :isAllowed="isAllowed"
        @click="() => goNext()"
      />
      <button
        v-else
        class="w-[120px] h-[56px] flex justify-center rounded-full items-center font-bold text-base text-white"
        :class="{
          'bg-[#DADFF5]': !isAllowed,
          'bg-[#3C36A7]': isAllowed,
        }"
        @click="goNext"
        :disabled="!isAllowed"
      >
        SUBMIT
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import PopupTimer from '@/components/PopupTimer.vue';
import PopupWatchCarefully from '@/components/PopupWatchCarefully.vue';
import ButtonItems from '@/components/ButtonItems.vue';
import RobotItem from '@/components/RobotItem.vue';
import CheckInReport1View from '@/components/CheckInReport1View.vue';
import CheckInReport2View from '@/components/CheckInReport2View.vue';
import CheckInReport3View from '@/components/CheckInReport3View.vue';
import CheckInReport4View from '@/components/CheckInReport4View.vue';
import CheckInReport5View from '@/components/CheckInReport5View.vue';
import CheckInNotice6View from '@/components/CheckInNotice6View.vue';
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

const nowPage = ref(1);
const totalQuestion = ref(6);
const question = ref([]);
const questionP = ref('');
const report4Flag = ref('empty');
const report4Show = ref(false);
const showButtons = ref(true);
const showWatchCarefully = ref(false);
const showTimer = ref(false);

onMounted(() => {
  onLoad();
});

watch(
  () => type.value,
  () => {
    onLoad();
  }
);

const isLastPage = computed(() => {
  if (nowPage.value === totalQuestion.value) {
    return true;
  }
  return false;
});

const whiteAnnounceText = computed(() => {
  if (nowPage.value === totalQuestion.value) {
    return 'This is the last question!';
  }
  return `Question ${nowPage.value}.`;
});

const onLoad = () => {
  console.log('onLoad CheckInReportView');
  showButtons.value = true;

  // 글 읽어주는 기능 on / off
  const needVoiceList = [3, 4, 5, 6];
  if (needVoiceList.includes(type.value)) {
    needVoice.value = true;
  } else {
    needVoice.value = false;
  }

  setTotalQuestion();
  setQuestion();

  setPage();

  setAnnounceTextList();

  // 헤더 정보 업데이트
  setTitle();
  setDate();
};

const setTotalQuestion = () => {
  const t = type.value;
  let total = 1;
  switch (t) {
    case 1:
      total = 6;
      break;
    case 2:
      total = 15;
      break;
    case 3:
      total = 4;
      break;
    case 4:
      total = 4;
      break;
    case 5:
      total = 5;
      break;
    case 6:
      total = 4;
      break;
  }

  totalQuestion.value = total;
};

const setQuestion = async () => {
  const t = type.value;
  question.value = [''];
  questionP.value = '';

  // type, nowPage로 데이터 넣기
  switch (t) {
    case 1:
      question.value = [
        'In school, how possible is it for you',
        'to change behaving well in class?',
      ];
      break;
    case 2:
      question.value = ['I get into trouble for not paying attention.'];
      break;
  }
};

const setPage = () => {
  const t = type.value;
  let p = '';

  switch (t) {
    case 1:
      p = 1;
      break;
    case 2:
      p = 15;
      break;
    case 3:
      p = 1;
      break;
    case 4:
      p = 1;
      break;
    case 5:
      p = 5;
      break;
    case 6:
      p = 1;
      break;
  }

  nowPage.value = p;
};

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

const goPrev = () => {
  if (type.value > 1) {
    type.value -= 1;
    router.replace({
      name: 'checkInReport',
      params: { type: type.value },
    });
  } else {
    router.push({
      name: 'checkInNotice',
      params: { type: type.value },
    });
  }
};

const goNext = () => {
  if (type.value < 5) {
    if (type.value === 3) {
      router.replace({
        name: 'checkInNotice',
        params: { type: 4 },
      });
    } else {
      type.value += 1;
      router.replace({
        name: 'checkInReport',
        params: { type: type.value },
      });
    }
  } else {
    router.push({ name: 'diary1' });
  }
};

const setAnnounceTextList = async () => {
  const t = type.value;
  announceTextList.value = [];
  questionP.value = '';

  switch (t) {
    case 3:
      announceTextList.value = [
        'Which of four words best describes what this person in the photo is thinking or feeling?',
      ];
      break;
    case 4:
      isSpeaking.value = true;

      showWatchCarefully.value = true;
      await waitSec(2);
      showWatchCarefully.value = false;

      report4Flag.value = 'empty';
      report4Show.value = false;
      showButtons.value = false;
      showTimer.value = true;

      announceTextList.value = [
        'Remember, the question is, what the person in the photo is thinking  or feeling?',
      ];
      await waitSec(3);
      showTimer.value = false;
      announceTextList.value = [''];
      report4Flag.value = '1';
      await waitSec(1);
      report4Flag.value = 'empty';
      isSpeaking.value = false;
      report4Show.value = true;
      showButtons.value = true;
      announceTextList.value = [
        'Which of six words best describes what the person in the photo was thinking or feeling?',
      ];
      break;
    case 5:
      announceTextList.value = [
        'After a little while, April can’t stop herself from eating a chocolate chip cookie. ',
        'Later, she goes home and remembers that she ate a chocolate chip cookie without asking. ',
        'She wonders if she should tell her mom about it. ',
        'In the end, April never tells her mom about taking the cookie. ',
      ];
      break;
  }

  if (nowPage.value === totalQuestion.value) {
    questionP.value = 'This is the last question!';
  } else {
    questionP.value = `Question ${nowPage.value}.`;
  }
};

const allowNext = (flag) => {
  nextFlag.value = flag;
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
          const targetScrollTop =
            currentTextElement.offsetTop - container.offsetTop - 4; // 스크롤 위치
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

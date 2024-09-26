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
            style="overflow-y: auto; max-height: 110px"
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

      <CheckInNotice1View v-if="type === 1" @allowNext="allowNext" />
      <CheckInNotice2View v-if="type === 2" @allowNext="allowNext" />
      <CheckInNotice3View v-if="type === 3" @allowNext="allowNext" />
      <CheckInNotice6View v-if="type === 6" @allowNext="allowNext" />
    </div>
    <div class="flex justify-end w-full">
      <button
        class="w-[120px] h-[56px] bg-[#3C36A7] flex justify-end rounded-full items-center font-bold text-base text-white pr-5"
        :class="{
          'bg-[#DADFF5]': !isAllowed,
        }"
        @click="startReport"
        :disabled="!isAllowed"
      >
        START
        <img
          :src="require(`@/assets/img/startArrow.svg`)"
          class="w-[15px] ml-2"
          :class="{
            'opacity-20': !isAllowed,
          }"
          alt="startArrow"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import RobotItem from '@/components/RobotItem.vue';
import CheckInNotice1View from '@/components/CheckInNotice1View.vue';
import CheckInNotice2View from '@/components/CheckInNotice2View.vue';
import CheckInNotice3View from '@/components/CheckInNotice3View.vue';
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
  const allowedType = [4, 5];
  if (allowedType.includes(type.value)) return true;
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
        'This section contains sentences that tell how some boys and girls think or feel or act. Read each sentence carefully. You will have four answer choices: 1, 2, 3, 4 and 5.',
        '',
        'Check 1 if the sentence is NOT AT ALL POSSIBLE TO CHANGE for you.',
        'Check 2 if the sentence is A LITTLE POSSIBLE TO CHANGE for you.',
        'Check 3 if the sentence is SOMEWHAT POSSIBLE TO CHANGE for you.',
        'Check 4 if the sentence is QUITE POSSIBLE TO CHANGE for you.',
        'Check 5 if the sentence is COMPLETELY POSSIBLE TO CHANGE for you.',
        '',
        'Press "start" to begin.',
      ];
      break;
    case 2:
      textList = [
        'This section contains sentences that tell how some boys and girls think or feel or act. Read each sentence carefully. You will have four answer choices: 1, 2, 3, and 4.  ',
        '',
        'Check 1 if the sentence NEVER describes you or how you feel.  ',
        'Check 2 if the sentence SOMETIMES describes you or how you feel.  ',
        'Check 3 if the sentence OFTEN describes you or how you feel.  ',
        'Check 4 if the sentence ALMOST ALWAYS describes you or how you feel.  ',
        '',
        'Press "start" to begin.',
      ];
      break;
    case 3:
      textList = [
        'On the screen, you will see a photo of a person with just their eyes shown, like the one below. You will also see words written on each corner of the screen. You are to choose from four words that best describe what the person in the photo is thinking or feeling as quickly as possible.  ',
        'Give the best answer as quickly as possible, even if it is hard to make up your mind.  ',
        'If no answer, repeat: “give the best answer as quickly as possible, even if it is hard to make up your mind.”  ',
        '',
        'Press "start" to begin.',
      ];
      break;
    case 4:
      textList = [
        'Once we begin, you will see the photo of a person inside this black screen.  ',
        'Watch carefully, as the photo will only be displayed on the screen for a second. Try to see what the person in the photo is thinking or feeling. Ready? On the count of 3, 2, 1!  ',
        'Which of the six words best describes what the person in the photo was thinking or feeling?  ',
        'If no answer, say: “give the best answer as quickly as possible, even if it is hard to make up your mind.”  ',
        'Always count down so that students will pay attention and not miss the photo being displayed.  ',
        '',
        'Press "start" to begin.',
      ];
      break;
    case 5:
      textList = [
        'On this screen, there are words that represent pictures and emotions.  ',
        'Hear each sentence carefully. You will have four answer choices: 1, 2, 3, and 4.  ',
        'You can only listen to the guide voice once, so please listen carefully and choose in a quiet place. Are you ready?  ',
        '',
        'Press "start" to begin.',
      ];
      break;
    case 6:
      textList = [
        'On this task, you will choose one of the eyes as well as the nose/mouth pieces to create a facial expression that best matches the given scenario.  ',
        'For example, to create a happy face, I would choose these two pieces. [demonstrate the choosing of the correct pieces]. As you click, you will see your selections on the kid’s face.  ',
        'Pay attention to the scenario.  ',
        '',
        'Give the best answer as quickly as possible, even if it is hard to make up your mind.  ',
        'When you are ready, press "start" to begin.',
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

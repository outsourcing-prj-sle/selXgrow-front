// i18n.js
import { createI18n } from 'vue-i18n';
// import common from '@/assets/dictionary/common';
// import footer from '@/assets/dictionary/footer';

// // 메시지 객체 변환 함수
// const formatMessages = (json, namespace) => {
//   return Object.keys(json).reduce((acc, key) => {
//     Object.keys(json[key]).forEach((lang) => {
//       if (!acc[lang]) acc[lang] = {};
//       if (!acc[lang][namespace]) acc[lang][namespace] = {};
//       acc[lang][namespace][key] = json[key][lang];
//     });
//     return acc;
//   }, {});
// };

// const commonMessages = formatMessages(common, 'common');
// const footerMessages = formatMessages(footer, 'footer');

// 메시지 통합
const messages = {
  // en: {
  //   ...commonMessages.en,
  //   ...footerMessages.en,
  // },
  // ko: {
  //   ...commonMessages.ko,
  //   ...footerMessages.ko,
  // },
};

const i18n = createI18n({
  legacy: false,
  locale: 'ko',
  fallbackLocale: 'en',
  messages,
});

export default i18n;

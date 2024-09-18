import { createApp } from 'vue';
import pinia from './store/pinia.js';
import App from './App.vue';
import router from './router';
import i18n from '@/utils/i18n.js';
import './assets/css/style.css';
import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import VueApexCharts from 'vue3-apexcharts';
import CKEditor from '@ckeditor/ckeditor5-vue';
import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

/**
 * 콘솔 출력 제거
 */
if(process.env.VUE_APP_PRODUCTION === 'live' || process.env.VUE_APP_PRODUCTION === 'inner') {
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
    console.info = () => {};
    console.debug = () => {};
}

const app = createApp(App);

app.use(i18n);
// 글로벌 딕셔너리 추가
app.config.globalProperties.$t = i18n.global.t;

// 달력
app.use(setupCalendar, {});
app.component('VCalendar', Calendar);
app.component('VDatePicker', DatePicker);

// 차트
app.use(VueApexCharts);

// ckeditor5
app.use(CKEditor);

app.use(router);
app.use(pinia);
app.mount('#app');

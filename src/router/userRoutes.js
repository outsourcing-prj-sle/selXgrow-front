import { UserLayout } from '@/layouts';
import {
  HomeView,
  LoginView,
  SignupView,
  StartView,
  Diary1View,
  AdventuresView,
  Diary2View,
  Diary3View,
  DiaryHistoryView,
  AdventuresDetailView,
  LessonPlanView,
} from '@/views';

const metaData = (
  needLogin = true,
  sidebarVisible = true,
  headerVisible = true
) => {
  return {
    needLogin,
    sidebarVisible,
    headerVisible,
  };
};

const userRoutes = [
  {
    path: '/grow',
    component: UserLayout,
    children: [
      {
        path: '',
        name: 'start',
        component: StartView,
        meta: { ...metaData(false, false, false) },
      },
      {
        path: 'login',
        name: 'login',
        component: LoginView,
        meta: { ...metaData(false, false, true) },
      },
      {
        path: 'signup',
        name: 'signup',
        component: SignupView,
        meta: { ...metaData(false, false, true) },
      },
      {
        path: 'home',
        name: 'home',
        component: HomeView,
        meta: { ...metaData(), isCheckIn: true, headerTitle: 'SEL Check-in' },
      },
      {
        path: 'diary/1',
        name: 'diary1',
        component: Diary1View,
        meta: {
          ...metaData(),
          isDiary: true,
          headerTitle: 'SEL Diary - Step 1',
        },
      },
      {
        path: 'diary/2',
        name: 'diary2',
        component: Diary2View,
        meta: {
          ...metaData(),
          isDiary: true,
          headerTitle: 'SEL Diary - Step 2',
        },
      },
      {
        path: 'diary/3',
        name: 'diary3',
        component: Diary3View,
        meta: {
          ...metaData(),
          isDiary: true,
          headerTitle: 'SEL Diary - Step 3',
        },
      },
      {
        path: 'diary/history',
        name: 'diaryHistory',
        component: DiaryHistoryView,
        meta: { ...metaData(), isDiary: true, headerTitle: 'Emotinal diary' },
      },
      {
        path: 'adventures',
        name: 'adventures',
        component: AdventuresView,
        meta: {
          ...metaData(),
          isAdventyres: true,
          headerTitle: 'SEL Adventures',
        },
      },
      {
        path: 'adventures/:id',
        name: 'adventuresDetail',
        component: AdventuresDetailView,
        meta: {
          ...metaData(),
          isAdventyres: true,
          headerTitle: 'SEL Adventures',
        },
      },
      {
        path: 'lesson-plan',
        name: 'lesson-plan',
        component: LessonPlanView,
        meta: {
          ...metaData(),
          isLessonPlan: true,
          headerTitle: 'Sharing SEL lesson plans',
        },
      },
    ],
  },
];

export default userRoutes;

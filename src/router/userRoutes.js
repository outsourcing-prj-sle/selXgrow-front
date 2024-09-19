import { UserLayout } from '@/layouts';
import { HomeView, LoginView, SignupView, StartView, DiaryView } from '@/views';

const metaData = (
  needLogin = true,
  sidebarVisible = true,
  headerVisible = true,
) => {
  return {
    needLogin,
    sidebarVisible,
    headerVisible,
  }
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
        path: 'diary',
        name: 'diary',
        component: DiaryView,
        meta: { ...metaData(), isDiary: true, headerTitle: 'SEL Diary - Step 1' },
      },
    ],
  },
];

export default userRoutes;

import { UserLayout } from '@/layouts';
import { HomeView, LoginView, SignupView, StartView, AdventuresView } from '@/views';

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
        meta: { ...metaData(), isCheckIn: true },
      },
      {
        path: 'adventures',
        name: 'adventures',
        component: AdventuresView,
        meta: { ...metaData(), isAdventyres: true, headerTitle: 'SEL Adventures' },
      },
    ],
  },
];

export default userRoutes;

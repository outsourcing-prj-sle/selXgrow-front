import { createRouter, createWebHistory } from "vue-router";
import userRoutes from './userRoutes';

const routes = [...userRoutes];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    console.log('Navigating to:', to.path);
    next();
});

export default router;
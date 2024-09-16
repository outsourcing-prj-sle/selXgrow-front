import { createRouter, createWebHashHistory } from "vue-router";
import { UserLayout } from '@/layouts'
import { HomeView } from '@/views'

export default createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: UserLayout,
            children: [
                {
                    path: '',
                    name: 'home',
                    component: HomeView
                }
            ],
        },
    ],
})

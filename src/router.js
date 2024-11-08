import { createRouter, createWebHistory } from 'vue-router';
    import AppHome from './pages/AppHome.vue';
    import AppStats from './pages/AppStats.vue';
    import AppDice from './pages/AppDice.vue';
    import NotFound from './pages/NotFound.vue';

    const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome
        },
        {
            path: '/stats',
            name: 'stats',
            component: AppStats
        },
        {
            path: '/roll',
            name: 'roll',
            component: AppDice
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFound
        },
    ]
    });
    export { router };
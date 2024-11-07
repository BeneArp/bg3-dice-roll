import { createRouter, createWebHistory } from 'vue-router';
    import AppHome from './pages/AppHome.vue';
    import AppDice from './pages/AppDice.vue';
    import AppStats from './pages/AppStats.vue';
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
            path: '/roll',
            name: 'roll',
            component: AppDice
        },
        {
            path: '/stats',
            name: 'stats',
            component: AppStats
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFound
        },
    ]
    });
    export { router };
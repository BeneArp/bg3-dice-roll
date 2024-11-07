import { createRouter, createWebHistory } from 'vue-router';
    import AppHome from './pages/AppHome.vue';
    import AppAbout from './pages/AppAbout.vue';
    import AppContacts from './pages/AppContacts.vue';
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
            path: '/about',
            name: 'about us',
            component: AppAbout
        },
        {
            path: '/contacts',
            name: 'contact me',
            component: AppContacts
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFound
        },
    ]
    });
    export { router };
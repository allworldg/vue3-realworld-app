import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
const routes: RouteRecordRaw[] = [
    { path: '/', component: () => { return import('@/components/Home.vue') }, children: [] },
    { path: '/login', component: () => { return import('@/components/login.vue') }, children: [] }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})




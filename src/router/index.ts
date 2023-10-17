import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
// import hello from '../components/hello.vue'
const routes: RouteRecordRaw[] = [
    { path: '/', component: () => { return import('@/components/hello.vue') }, children: [] }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})




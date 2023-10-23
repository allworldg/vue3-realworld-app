import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import { getCookie } from "@/utils/auth";
import { useUserStore } from "@/store/index";
import { getUser } from "@/api/user";
const userStore = useUserStore();
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => {
      return import("@/components/Home.vue");
    },
    children: [],
  },
  {
    path: "/login",
    component: () => {
      return import("@/components/login.vue");
    },
    children: [],
  },
  {
    path: "/register",
    component: () => {
      return import("@/components/register.vue");
    },
    children: [],
  },
];
const whiteList = ["/", "/login", "/register"];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

router.beforeEach(async (to, _from, next) => {
  const hasCookie = getCookie();
  if (hasCookie) {
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      try {
        if (userStore.getUser === null) {
          const user = await getUser();
          userStore.setAuth(user);
        }
        next();
      } catch (error) {
        console.error(error);
        userStore.$reset();
        next({ path: "/" });
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next({ path: `/login?redirect=${to.path}` });
    }
  }
});

export default router;

import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import { getCookie, removeCookie } from "@/utils/auth";
import { useUserStore } from "@/store/index";
import { getUser } from "@/api/user";
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
  const userStore = useUserStore();
  const hasCookie = getCookie();
  if (hasCookie) {
    console.log("hascookie");
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      try {
        if (userStore.getUser === null) {
          const response = await getUser();
          userStore.setAuth(response.user);
        }
        next();
      } catch (error) {
        console.error(error);
        // userStore.$reset();
        removeCookie();
        next({ path: "/" });
      }
    }
  } else {
    console.log("nocookie");
    console.log(to.path);
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next({ path: `/login?redirect=${to.path}` });
    }
  }
});

export default router;

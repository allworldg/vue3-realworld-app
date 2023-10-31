import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import { getCookie, removeCookie } from "@/utils/auth";
import { useUserStore } from "@/store/index";
import { getUser } from "@/api/user";
import Home from "@/components/Home.vue";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/components/Home.vue"),
    children: [],
  },
  {
    path: "/login",
    component: () => import("@/components/login.vue"),
    children: [],
  },
  {
    path: "/register",
    component: () => import("@/components/register.vue"),
    children: [],
  },
  {
    path: "/editor",
    component: () => import("@/components/Editor.vue"),
  },
  {
    path: "/settings",
    component: () => import("@/components/Settings.vue"),
  },
  {
    path: "/@:username(\\w+)",
    component: () => import("@/components/Profile.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
    component: Home,
    children: [],
  },
];
const whiteList = ["/", "/login", "/register", "/article/*"];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

router.beforeEach(async (to, _from, next) => {
  console.log(to.path);
  const userStore = useUserStore();
  const hasCookie = getCookie();
  if (hasCookie) {
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
        userStore.$reset();
        removeCookie();
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

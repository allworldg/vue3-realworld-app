import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import { getCookie, removeCookie } from "@/utils/auth";
import { useUserStore } from "@/store/index";
import { getUser, getProfile } from "@/api/user";
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
    path: "/@:username([^/]+)",
    component: () => import("@/components/Profile.vue"),
    beforeEnter: (to, _from, next) => {
      let userName = to.path.slice(2, to.path.length);
      getProfile(userName)
        .then((res) => {
          to.meta.profile = res.profile;
          next();
        })
        .catch((_e) => {
          next({ path: "/" });
        });
    },
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
    component: Home,
    children: [],
  },
];
const whiteList = ["/", "/login", "/register"];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach(async (to, _from, next) => {
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
    if (
      whiteList.indexOf(to.path) !== -1 ||
      (to.meta.requiresAuth !== undefined && to.meta.requiresAuth === false)
    ) {
      next();
    } else {
      next({ path: `/login?redirect=${to.path}` });
    }
  }
});

export default router;

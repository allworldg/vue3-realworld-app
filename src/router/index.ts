import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import { getCookie, removeCookie } from "@/utils/auth";
import { useUserStore } from "@/store/index";
import { getUser, getProfile } from "@/api/user";
import Home from "@/components/Home.vue";
import { AxiosError } from "axios";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/components/Home.vue"),
    children: [],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/login.vue"),
    children: [],
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/components/register.vue"),
    children: [],
  },
  {
    path: "/article/:slug",
    name: "article",
    component: () => import("@/components/Article.vue"),
    props: true,
    meta: {
      requiresAuth: false,
    },
  },

  {
    name: "editor",
    path: "/editor/:slug?",
    component: () => import("@/components/Editor.vue"),
    props: true,
  },
  {
    path: "/settings",
    component: () => import("@/components/Settings.vue"),
  },
  {
    path: "/@:username([^/]+)",
    name: "profile",
    component: () => import("@/components/Profile.vue"),
    beforeEnter: (to, _from, next) => {
      let userName = to.params.username as string;
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
    children: [
      {
        path: "",
        name: "profileArticle",
        component: () => import("@/components/ProfileArticles.vue"),
      },
      {
        path: "favorites",
        name: "favorites",
        component: () => import("@/components/ProfileArticles.vue"),
      },
    ],
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
      } catch (err) {
        const error = err as AxiosError;
        console.log("wrong!");
        console.log(error);
        if (error.response?.status === 403||error.response?.status===401) {
          userStore.$reset();
          removeCookie();
          next({ path: "/" });
        }
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

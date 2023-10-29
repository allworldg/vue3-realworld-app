import { defineStore } from "pinia";
import { User } from "@/types/user";
import { setCookie } from "@/utils/auth";
const TOKEN_PREFIX: string = "Token ";
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      isLogined: false,
      user: null as User | null,
      token: "" as string | undefined,
    };
  },

  getters: {
    getIsLogined(state) {
      return state.isLogined;
    },
    getUser(state) {
      return state.user;
    },
  },
  actions: {
    setAuth(user_data: User) {
      this.user = user_data;
      this.token = user_data.token;
      this.isLogined = true;
      setCookie(`${TOKEN_PREFIX}${user_data.token}`);
    },
  },
});

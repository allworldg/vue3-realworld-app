import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
    state: () => {
        return {
            isLogined: false,
            user: {}
        }
    },
    getters: {
        isLogined(state) {
            return state.isLogined;
        }
    }

})
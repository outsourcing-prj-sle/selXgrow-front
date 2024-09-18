import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    type: '',
    isRegistered: true,
    extra: {},
  }),
  actions: {
    init(data) {
      this.token = data.token;
      this.type = data.type;
      this.isRegistered = data.isRegistered;
      this.extra = data.extra;
    },
    finRegistered() {
      this.isRegistered = true;
    },
    logout() {
      this.token = '';
      this.type = '';
      this.isRegistered = false;
      this.extra = {};
    },
  },
});

import { defineStore } from 'pinia';

export const useHeaderStore = defineStore('header', {
  state: () => ({
    title: '',
    date: '',
  }),
  actions: {
    resetHeader() {
      this.title = '';
      this.date = '';
    },
    initTitle(data) {
      this.title = data;
    },
    initDate(data) {
      this.date = data;
    },
  },
});

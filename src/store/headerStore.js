import { defineStore } from 'pinia';

export const useHeaderStore = defineStore('header', {
  state: () => ({
    title: '',
    date: '',
    time: '',
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
    updateDate() {
      const now = new Date();
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      };
      const formattedTime = now.toLocaleString('en-US', options).replace(',', '');

      const [date, time] = formattedTime.split(' ');
      const [hour, minute] = time.split(':');
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const adjustedHour = hour % 12 || 12;

      this.date = `${date}`;
      this.time = `${ampm} ${adjustedHour}:${minute}`
    },
  },
});

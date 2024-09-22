import { defineStore } from 'pinia';

export const useDiaryStore = defineStore('diary', {
  state: () => ({
    color: '',
    icon: '',
    mood: '',
    level: '',
    levelName: '',
    reason: '',
  }),
  actions: {
    resetDiary() {
      this.color = '';
      this.icon = '';
      this.mood = '';
      this.level = '';
      this.levelName = '';
      this.reason = '';
    },
    setColor(data) {
      this.color = data;
    },
    setIcon(data) {
      this.icon = data;
    },
    setMood(data) {
      this.mood = data;
    },
    setLevel(data) {
      this.level = data;
    },
    setLevelName(data) {
      this.levelName = data;
    },
    setReason(data) {
      this.reason = data;
    },
  },
});

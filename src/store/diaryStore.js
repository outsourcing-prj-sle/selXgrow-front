import { defineStore } from 'pinia';
import { DIARY_MONTHS, MOODS, MOODS_LEVEL } from '@/utils/constant'

export const useDiaryStore = defineStore('diary', {
  state: () => ({
    color: '',
    icon: '',
    mood: '',
    level: '',
    levelName: '',
    reason: '',
    date: '',
    formattedDate: '',
    diaryContents: [
      {
        mood: MOODS.Sad.name,
        level: '3',
        levelName: MOODS_LEVEL[2],
        reason: 'For other reasons not listed',
        color: MOODS.Sad.highlightColor,
        formattedDate: 'September 5,2024 1:30pm',
        date: '9/5/2024',
      },
      {
        mood: MOODS.Excited.name,
        level: '5',
        levelName: MOODS_LEVEL[4],
        reason: 'For other reasons not listed',
        color: MOODS.Excited.highlightColor,
        formattedDate: 'September 7,2024 4:30pm',
        date: '9/7/2024',
      },
      {
        mood: MOODS.Angry.name,
        level: '1',
        levelName: MOODS_LEVEL[0],
        reason: 'For other reasons not listed',
        color: MOODS.Angry.highlightColor,
        formattedDate: 'September 13,2024 6:00am',
        date: '9/13/2024',
      },
      {
        mood: MOODS.Content.name,
        level: '4',
        levelName: MOODS_LEVEL[3],
        reason: 'For other reasons not listed',
        color: MOODS.Content.highlightColor,
        formattedDate: 'September 21,2024 8:25pm',
        date: '9/21/2024',
      },
      {
        mood: MOODS.Embarrassed.name,
        level: '2',
        levelName: MOODS_LEVEL[1],
        reason: 'For other reasons not listed',
        color: MOODS.Embarrassed.highlightColor,
        formattedDate: 'September 11,2024 12:30pm',
        date: '9/11/2024',
      },
    ]
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
    setDate(data) {
      this.date = data.toLocaleDateString('en-US');

      const monthName = DIARY_MONTHS[data.getMonth()];
      const day = data.getDate();
      const year = data.getFullYear();
      let hours = data.getHours();
      const minutes = data.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'pm' : 'am';

      hours = hours % 12 || 12;

      const formattedDate = `${monthName} ${day}, ${year} ${hours}:${minutes}${ampm}`;

      this.formattedDate = formattedDate;
    },
    pushDiaryContents() {
      this.diaryContents.push({
        mood: this.mood,
        level: this.level,
        levelName: this.levelName,
        reason: this.reason,
        color: this.color,
        formattedDate: this.formattedDate,
        date: this.date,
      })
    }
  },
});

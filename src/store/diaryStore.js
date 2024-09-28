import { defineStore } from 'pinia';
import { DIARY_MONTHS, MOODS, MOODS_LEVEL } from '@/utils/constant'

export const useDiaryStore = defineStore('diary', {
  state: () => ({
    color: '',
    highlightColor: '',
    icon: '',
    mood: '',
    level: '',
    levelName: '',
    reason: '',
    date: '',
    formattedDate: '',
    diaryContents: []
  }),
  actions: {
    resetDiary() {
      this.color= '';
      this.highlightColor = '';
      this.icon = '';
      this.mood = '';
      this.level = '';
      this.levelName = '';
      this.reason = '';
      this.date = '';
      this.formattedDate = '';
    },
    setColor(data) {
      this.color = data;
    },
    setHighlightColor(data) {
      this.highlightColor = data;
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
      const index = this.diaryContents.findIndex(diaryContent => diaryContent.date === this.date);

      if (index !== -1) {
        this.diaryContents.splice(index, 1);
      }

      this.diaryContents.push({
        mood: this.mood,
        level: this.level,
        levelName: this.levelName,
        reason: this.reason,
        color: this.color,
        highlightColor: this.highlightColor,
        formattedDate: this.formattedDate,
        date: this.date,
      })
    },
    initDiaryContents() {
      this.diaryContents.length = 0;

      const diaryContents = [
        {
          mood: MOODS.Embarrassed.name,
          level: '3',
          levelName: MOODS_LEVEL[2],
          reason: 'related to friends.',
          color: MOODS.Embarrassed.color,
          highlightColor: MOODS.Embarrassed.highlightColor,
          formattedDate: 'September 18,2024 3:10pm',
          date: '9/18/2024',
        },
        {
          mood: MOODS.Worried.name,
          level: '4',
          levelName: MOODS_LEVEL[3],
          reason: 'about myself.',
          color: MOODS.Worried.color,
          highlightColor: MOODS.Worried.highlightColor,
          formattedDate: 'September 16, 2024 12:10pm',
          date: '9/16/2024',
        },
        {
          mood: MOODS.Thankful.name,
          level: '2',
          levelName: MOODS_LEVEL[1],
          reason: 'related to my family.',
          color: MOODS.Thankful.color,
          highlightColor: MOODS.Thankful.highlightColor,
          formattedDate: 'September 14, 2024 9:10pm',
          date: '9/14/2024',
        },
        {
          mood: MOODS.Proud.name,
          level: '4',
          levelName: MOODS_LEVEL[3],
          reason: 'related to family.',
          color: MOODS.Proud.color,
          highlightColor: MOODS.Proud.highlightColor,
          formattedDate: 'September 13, 2024  1:12pm',
          date: '9/13/2024',
        },
        {
          mood: MOODS.Sad.name,
          level: '1',
          levelName: MOODS_LEVEL[0],
          reason: 'related to school grade.',
          color: MOODS.Sad.color,
          highlightColor: MOODS.Sad.highlightColor,
          formattedDate: 'September 10, 2024 2:30pm',
          date: '9/10/2024',
        },
        {
          mood: MOODS.Excited.name,
          level: '3',
          levelName: MOODS_LEVEL[2],
          reason: 'related to friends.',
          color: MOODS.Excited.color,
          highlightColor: MOODS.Excited.highlightColor,
          formattedDate: 'September 9, 2024 4:20pm',
          date: '9/9/2024',
        },
        {
          mood: MOODS.Confused.name,
          level: '5',
          levelName: MOODS_LEVEL[4],
          reason: 'something that happened in class.',
          color: MOODS.Confused.color,
          highlightColor: MOODS.Confused.highlightColor,
          formattedDate: 'September 7, 2024 3:29pm',
          date: '9/7/2024',
        },
      ];

      diaryContents.forEach((diaryContent) => {
        this.diaryContents.push(diaryContent)
      })
    }
  },
});

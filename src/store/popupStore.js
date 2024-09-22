import { defineStore } from 'pinia';

export const usePopupStore = defineStore('popup', {
  state: () => ({
    isOpenedSaveDiaryPopup: false,
  }),
  actions: {
    closeAllPopup() {
      this.isOpenedSaveDiaryPopup = false;
    },
    openSaveDiaryPopup() {
      if (this.isOpenedSaveDiaryPopup) {
        this.closeAllPopup();
      } else {
        this.closeAllPopup();
        this.isOpenedSaveDiaryPopup = true;
      }
    },
  },
});

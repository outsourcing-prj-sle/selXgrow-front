import { defineStore } from 'pinia';

export const usePopupStore = defineStore('popup', {
  state: () => ({
    isOpenedSaveDiaryPopup: false,
    isOpenedCommonPopup: false,
    commonPopupId: '',
  }),
  actions: {
    closeAllPopup() {
      this.isOpenedSaveDiaryPopup = false;
    },
    closeCommonPopup() {
      this.isOpenedCommonPopup = false;
    },
    openSaveDiaryPopup() {
      if (this.isOpenedSaveDiaryPopup) {
        this.closeAllPopup();
      } else {
        this.closeAllPopup();
        this.isOpenedSaveDiaryPopup = true;
      }
    },
    openCommonPopup() {
      if (this.isOpenedCommonPopup) {
        this.closeCommonPopup();
      } else {
        this.closeCommonPopup();
        this.isOpenedCommonPopup = true;
      }
    },
  },
});
